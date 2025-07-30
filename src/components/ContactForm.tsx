import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-50 rounded-lg">
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700 uppercase tracking-wide">
              Name
            </Label>
            <Input
              id="name"
              placeholder="John Carter"
              className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 focus:border-gray-500 focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 uppercase tracking-wide">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@therapist.com"
              className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 focus:border-gray-500 focus:ring-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700 uppercase tracking-wide">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(135) 642 - 3562"
              className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 focus:border-gray-500 focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule" className="text-sm font-medium text-gray-700 uppercase tracking-wide">
              Schedule
            </Label>
            <Input
              id="schedule"
              placeholder="Ex. 9:00 am"
              className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 focus:border-gray-500 focus:ring-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium text-gray-700 uppercase tracking-wide">
            Leave us a message
          </Label>
          <Textarea
            id="message"
            placeholder="Please type your message here..."
            className="min-h-[120px] border-0 border-b border-gray-300 rounded-none bg-transparent px-0 resize-none focus:border-gray-500 focus:ring-0"
          />
        </div>

        <div className="pt-4">
          <Button type="submit" className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full">
            Send message
          </Button>
        </div>
      </form>
    </div>
  )
}
