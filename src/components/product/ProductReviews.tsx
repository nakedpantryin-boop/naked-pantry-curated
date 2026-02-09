import { Star, User } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

interface ProductReviewsProps {
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

const defaultReviews: Review[] = [
  {
    author: "Priya M.",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely love the clean taste! You can tell there's nothing artificial in it. My kids enjoy it too.",
  },
  {
    author: "Rahul S.",
    rating: 4,
    date: "1 month ago",
    text: "Great for evening snacking without the guilt. Would love to see more flavor options though!",
  },
  {
    author: "Anita K.",
    rating: 5,
    date: "1 month ago",
    text: "The Naked Pantry never disappoints. This product is now a staple in our household.",
  },
];

const ProductReviews = ({
  rating = 4.5,
  reviewCount = 24,
  reviews = defaultReviews,
}: ProductReviewsProps) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-1">
            Customer Reviews
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating)
                      ? "fill-gold text-gold"
                      : i < rating
                      ? "fill-gold/50 text-gold"
                      : "text-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              {rating} out of 5 · {reviewCount} reviews
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-lighter flex items-center justify-center">
                  <User className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{review.author}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${
                      j < review.rating
                        ? "fill-gold text-gold"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductReviews;
