
// import { useState } from "react"
// import { z } from "zod"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
// import { Checkbox } from "../ui/checkbox"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"


// const formSchema = z.object({
//   agreed: z.literal(true, {
//     errorMap: () => ({ message: "You must agree to continue." }),
//   }),
// })

// export function TermsCheckboxForm() {
//   const [showModal, setShowModal] = useState(false)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       agreed: false,
//     },
//   })

//   return (
//     <>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit((data) => {
//             console.log("Form submitted", data)
//           })}
//           className="space-y-6"
//         >
//           <FormField
//             control={form.control}
//             name="agreed"
//             render={({ field }) => (
//               <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                 <FormControl>
//                   <Checkbox
//                     checked={field.value}
//                     onCheckedChange={(checked) => {
//                       field.onChange(checked)
//                       if (checked) setShowModal(true)
//                     }}
//                   />
//                 </FormControl>
//                 <div className="space-y-1 leading-none">
//                   <FormLabel>
//                     I agree to the{" "}
//                     <a href="#" className="underline">
//                       Terms & Conditions
//                     </a>{" "}
//                     and{" "}
//                     <a href="#" className="underline">
//                       Privacy Policy
//                     </a>
//                   </FormLabel>
//                   <FormDescription>
//                     You must agree before proceeding.
//                   </FormDescription>
//                 </div>
//               </FormItem>
//             )}
//           />
//           <FormMessage />
//         </form>
//       </Form>

//       <Dialog open={showModal} onOpenChange={setShowModal}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Terms & Conditions</DialogTitle>
//           </DialogHeader>
//           <div className="text-sm">
//             <p>
//               This is a sample modal. You can show your Terms & Conditions here.
//             </p>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }
