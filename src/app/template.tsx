export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      template_Starts
      {children}
      template_Ends
    </div>
  )
}
