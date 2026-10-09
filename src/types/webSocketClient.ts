// src/utils/WebSocketClient.ts
type MessageHandler = (data: any) => void;

export class WebSocketClient {
  private socket: WebSocket | null = null;
  private url: string;
  private handlers: Set<MessageHandler> = new Set();
  private reconnectInterval = 3000;
  private messageQueue: any[] = [];

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.messageQueue.forEach((msg) => {
        this.socket?.send(JSON.stringify(msg));
      });
      this.messageQueue = []; // clear queue
      this.handlers.forEach((h) => h({ type: "__connected" }));
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handlers.forEach((handler) => handler(data));
    };

    this.socket.onclose = () => {
      console.warn("⚠️ WebSocket disconnected, reconnecting...");
      setTimeout(() => this.connect(), this.reconnectInterval);
    };

    this.socket.onerror = (err) => {
      console.error("WebSocket error", err);
      this.socket?.close();
    };
  }

  public send(data: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      this.messageQueue.push(data);
    }
  }

  public addMessageHandler(handler: MessageHandler) {
    this.handlers.add(handler);
  }

  public removeMessageHandler(handler: MessageHandler) {
    this.handlers.delete(handler);
  }

  public close() {
    this.socket?.close();
  }
}
