import { _Resolver } from "../../interface";
import { Review } from "@prisma/client";

const Review: _Resolver<Review> = {
  Review: {
    // ! user는 어떤 경우에도 노출되면 안됩니다
    isMaker: () => {},
  },
};
