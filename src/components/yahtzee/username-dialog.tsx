"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useGamesContext } from "@/lib/hooks";

export default function UsernameDialog() {
  const { username, setUsername } = useGamesContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleAccept = () => {
    if (username?.trim() !== undefined) {
      setOpen(false);
      setUsername(username);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px] [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Set your username</DialogTitle>
          <DialogDescription>
            Please enter your username to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            onClick={handleAccept}
            disabled={username?.trim() === undefined || username?.trim() === ""}
          >
            Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
