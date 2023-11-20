import { useEffect } from "react";
import useCreateImage from "../../hooks/useCreateImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

function Share() {
    const element = document.getElementsByClassName("playlist-wrapper")[0];
    const { image, isCreating, createImage } = useCreateImage(element);

    useEffect(() => {
        const sharePost = async () => {
            if (!isCreating) {
                const data = {
                    files: [
                        new File([image], "image.png", {
                            type: image.type,
                        }),
                    ],
                    title: "Image",
                    text: "image",
                };

                // share here
            }
        };
        sharePost();
    }, [isCreating]);

    return (
        <div className="share">
            <FontAwesomeIcon
                className="share-btn"
                icon={faShareNodes}
                onClick={() => createImage()}
                style={{ height: "2rem" }}
            />
        </div>
    );
}

export default Share;
