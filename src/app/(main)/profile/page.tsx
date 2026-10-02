import {
  currentUser,
  shelves,
  activities,
  reviews,
  getBookById,
} from "@/lib/data";
import { ProfileView } from "@/components/ProfileView";

export default function ProfilePage() {
  const shelvesWithPreviews = shelves.map((shelf) => ({
    shelf,
    previews: shelf.bookIds.map(getBookById),
  }));
  const myActivities = activities.filter(
    (a) => a.user.username === currentUser.username,
  );
  const myReviews = reviews.filter(
    (r) => r.user.username === currentUser.username,
  );

  return (
    <ProfileView
      user={currentUser}
      isOwn
      shelves={shelvesWithPreviews}
      activities={myActivities.length ? myActivities : activities.slice(0, 3)}
      reviews={myReviews.length ? myReviews : reviews.slice(0, 2)}
    />
  );
}
