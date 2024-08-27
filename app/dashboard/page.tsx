"use client"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { Plus } from "lucide-react"

export default function Home() {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState("")

  const handleOpen = () => {
    setOpen(!open)
  }
  return (
    <>
      <div className="md:max-w-screen-2xl mx-auto py-5">
        <div className="py-5">
          <h1 className="text-2xl">Tables</h1>
        </div>
        <div className="items-center flex justify">
          <h2>Sort by</h2>
          <select className="border rounded ml-2">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
        <div className="flex items-start py-5">
          <Button variant="secondary" onClick={handleOpen}>
            <Plus />
            <span className="ml-1">Create table</span>
          </Button>

          {open && (
            <div className=" h-auto justify-start rounded shadow border">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-xl text-center">Title of the table</h2>
                <input
                  required
                  value={title}
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="w-full h-10 border border-gray-300 rounded-md mt-2 placeholder:text-center text-center"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p className="font-light pb-2">Title is required.</p>
                <div className="flex justify-between mt-2">
                  <Button variant="destructive" onClick={handleOpen}>
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    disabled={!title}
                    onClick={handleOpen}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          )}
          {/* TODO: 
          List of tables
          dynamic sort by
           */}
        </div>
      </div>
    </>
  )
}
