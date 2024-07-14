"use client";
import React, { useState} from "react";
import { Scalars } from "@/types";
import { AspectRatio, Box, Image, ImageProps, Spinner } from "@chakra-ui/react";

interface NFTThumbnailProps extends ImageProps {
  nftImage: Scalars["String"]["output"] | undefined;
  alt: string;
}

const NFTThumbnail = ({ nftImage, alt, ...props }: NFTThumbnailProps) => {
	const [isLoading, setIsLoading] = useState(true);
	return (
		<AspectRatio ratio={1} backgroundColor="black">
			<>
				{
					isLoading && <Box w={5}>
						<Spinner /> 		
					</Box>
				}
				<Image {...props} alt={isLoading ? "" : alt} src={nftImage} fit="contain" onLoad={() => setIsLoading(false)} sx={{display: isLoading ? "none" : "block"}}/>
			</>
		</AspectRatio>
	);
};

export default NFTThumbnail;
