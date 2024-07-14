"use client";
import { Box, VStack, HStack, Text } from "@chakra-ui/react";
import { Token } from "@/types";
import { shorten } from "@/utils/shorten";
import NFTThumbnail from "../NFTThumbnail";
import { nftImage } from "@/utils/nftImage";

interface NFTCardProps {
	nft: Token;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
	const imgUrl = nftImage(nft);

	const colors = {
		"white": "#F1F1EC",
		"black": "#151515",
	}

	const infoBoxStyle = {
		bg: "rgba(21, 21, 21, .9)",
		border: "secondary",
		borderRadius: "99px",
		py: "2px",
		px: "4px",
		lineHeight: "1"
	};


	if ( !nft.tokenID) return null;
	return (
		<Box
			borderRadius="md"
			border="secondary"
			aspectRatio={1}
			position="relative"
			transition="border-color .25s ease-in-out"
			_hover={{ borderColor: colors.white }}
			cursor="pointer"
		>
			<VStack zIndex="2" justifyContent="space-between" h="100%" p="4px">
				<Box alignSelf="flex-start" w="100%">
					<VStack justify="flex-start" w="100%">
						<HStack
							fontSize="xs"
							fontFamily="mono"
							alignItems="flex-start"
							justifyContent="space-between"
							w="100%"
						>
							<Box {...infoBoxStyle}>
								<HStack gap={2} alignItems="center" wrap="wrap">
									{nft.contract.name && <><Text as="span">{nft.contract.name}</Text> <Text as="span" color="gray.200">ϟ</Text></>}
									<Text fontWeight="bold" as="span">
										#{nft.tokenID.length > 10 ? shorten(nft.tokenID) : nft.tokenID}
									</Text>
								</HStack>
							</Box>
							<Box {...infoBoxStyle}>
								<Text as="span">{nft.contract.type}</Text>
							</Box>
						</HStack>
					</VStack>
				</Box>
			</VStack>

			<Box
				position="absolute"
				w="100%"
				h="100%"
				zIndex="-1"
				top="0"
				left="0"
				borderRadius="md"
				overflow="hidden"

			>
				<NFTThumbnail nftImage={imgUrl} alt={nft.name as string} />
			</Box>
		</Box>
	);
};

export default NFTCard;