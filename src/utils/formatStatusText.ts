export const formatStatusText = (text: string | null): string => {
  if (!text) return "";
  return text.replace(/_/g, " ");
};
