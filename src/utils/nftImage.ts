import { Token } from "@/types";
import placeholder from "@/assets/placeholder.png";
import { API_ENDPOINT } from "@/constants";

// Method to get images while we await support for hosted thumbnails
export function nftImage(nft: Token) {
	let nftImageUrl;

	if (nft.image?.thumbnails) {
        if (nft.image?.thumbnails[0]?.url) {
		    nftImageUrl = nft.image?.thumbnails[0]?.url;
        } else {
            
        }
	} else if (nft.image?.url) {
		nftImageUrl = `nftindexer/${nft.image.url}`;
	} else {
		return placeholder.src;
	}

	if (nftImageUrl) {
		if (nftImageUrl.charAt(0) === "/") {
			nftImageUrl = nftImageUrl.slice(1);
		}
	}

	return `${API_ENDPOINT}${nftImageUrl}`;
}