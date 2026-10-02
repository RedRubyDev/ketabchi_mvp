import { notFound } from "next/navigation";
import {
  getUser,
  currentUser,
  shelves,
  activities,
  reviews,
  getBookById,
} from "@/lib/data";
import { ProfileView } from "@/components/ProfileView";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = getUser(username);
  if (!user) notFound();

  const isOwn = user.username === currentUser.username;

  const shelvesWithPreviews = shelves.map((shelf) => ({
    shelf,
    previews: shelf.bookIds.map(getBookById),
  }));
  const userActivities = activities.filter(
    (a) => a.user.username === user.username,
  );
  const userReviews = reviews.filter((r) => r.user.username === user.username);

  return (
    <ProfileView
      user={user}
      isOwn={isOwn}
      shelves={isOwn ? shelvesWithPreviews : shelvesWithPreviews.slice(0, 2)}
      activities={
        userActivities.length ? userActivities : activities.slice(0, 2)
      }
      reviews={userReviews.length ? userReviews : reviews.slice(0, 1)}
    />
  );
}
