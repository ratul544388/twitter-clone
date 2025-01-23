import { BackButton } from "@/components/back-button";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ParamsType } from "@/types";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: ParamsType }) => {
  const { tweetId, mediaNo } = await params;

  const mediaNoNum = Number(mediaNo);

  if (Number.isNaN(mediaNoNum)) {
    return notFound();
  }

  const tweet = await db.tweet.findUnique({
    where: {
      id: tweetId,
    },
    select: {
      id: true,
      attachments: {
        select: {
          url: true,
        },
        take: 1,
        skip: mediaNoNum - 1,
      },
      _count: {
        select: {
          attachments: true,
        },
      },
    },
  });

  const imageSrc = tweet?.attachments[0]?.url;

  if (!imageSrc) {
    notFound();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center bg-neutral-900/50 px-3 backdrop-blur-sm sm:px-6 md:px-24">
      <Link
        href={`/tweets/${tweet.id}/media/${mediaNoNum - 1}`}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          mediaNoNum === 1 && "pointer-events-none opacity-50",
          "min-w-10 rounded-full",
        )}
      >
        <ChevronLeft className="size-5" />
      </Link>
      <BackButton
        variant="outline"
        className="absolute left-3 top-3 md:hidden"
      />
      <BackButton
        variant="outline"
        size="default"
        className="absolute left-3 top-3 hidden md:flex"
      >
        <ArrowLeft className="size-5" />
        Go Back
      </BackButton>
      <div className="relative h-full w-full">
        <Image
          src={imageSrc}
          alt="Attachment"
          fill
          className="object-contain"
        />
      </div>
      <Link
        href={`/tweets/${tweet.id}/media/${mediaNoNum + 1}`}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          mediaNoNum === tweet._count.attachments &&
            "pointer-events-none opacity-50",
          "min-w-10 rounded-full",
        )}
      >
        <ChevronRight className="size-5" />
      </Link>
    </div>
  );
};

export default Page;
