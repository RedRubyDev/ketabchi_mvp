"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { Check, UserPlus } from "lucide-react";
import { useToast } from "./ui/Toast";

export function FollowButton({
  name,
  initial = false,
  size = "md",
  fullWidth = false,
}: {
  name: string;
  initial?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}) {
  const [following, setFollowing] = useState(initial);
  const [confirm, setConfirm] = useState(false);
  const { toast } = useToast();

  const follow = () => {
    setFollowing(true);
    toast(`حالا ${name} را دنبال می‌کنید.`);
  };

  const unfollow = () => {
    setFollowing(false);
    setConfirm(false);
    toast(`دنبال کردن ${name} را متوقف کردید.`, "info");
  };

  return (
    <>
      {following ? (
        <Button
          variant="outline"
          size={size}
          fullWidth={fullWidth}
          onClick={() => setConfirm(true)}
        >
          <Check className="size-4" />
          دنبال می‌کنید
        </Button>
      ) : (
        <Button variant="primary" size={size} fullWidth={fullWidth} onClick={follow}>
          <UserPlus className="size-4" />
          دنبال کردن
        </Button>
      )}

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="لغو دنبال کردن"
        size="sm"
        footer={
          <div className="flex gap-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setConfirm(false)}
            >
              انصراف
            </Button>
            <Button variant="danger" fullWidth onClick={unfollow}>
              لغو دنبال کردن
            </Button>
          </div>
        }
      >
        <p className="text-body-sm text-muted">
          مطمئنید می‌خواهید دنبال کردن {name} را متوقف کنید؟
        </p>
      </Modal>
    </>
  );
}
