import type { User } from "@/lib/types";
import { Avatar } from "./ui/Avatar";
import { FollowButton } from "./FollowButton";
import { toFa } from "@/lib/utils";
import Link from "next/link";

export function UserCard({ user }: { user: User }) {
  return (
    <div className="card flex items-center gap-4 p-4">
      <Link href={`/users/${user.username}`} className="shrink-0">
        <Avatar name={user.name} color={user.avatar} size="lg" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Link
          href={`/users/${user.username}`}
          className="line-clamp-1 text-body font-bold hover:text-primary"
        >
          {user.name}
        </Link>
        <span className="text-caption text-muted" dir="ltr">
          @{user.username}
        </span>
        <span className="text-caption text-muted">
          {toFa(user.followers)} دنبال‌کننده
        </span>
      </div>
      <FollowButton name={user.name} size="sm" />
    </div>
  );
}
