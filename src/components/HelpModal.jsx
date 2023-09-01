import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const HelpModal = ({ isOpen, setIsOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      size={"xl"}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>How area of interest works?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex space-x-2">
            <span>&bull;</span>
            <span>
              This is base-map and an option to draw an AOI (Area of Interest)
              in any polygon shape.
            </span>
          </div>
          <div className="flex space-x-2 mt-4">
            <span>&bull;</span>
            <span>
              Upon drawing any polygon, area they will be presented with all the
              tiles (pre configured satellite image&apos;s metadata) which are
              intersecting that AOI.
            </span>
          </div>
          <div className="flex space-x-2 mt-4">
            <span>&bull;</span>
            <span>Example:</span>
          </div>
          <div className="flex space-x-2 mt-4">
            <span>&bull;</span>
            <span>
              In following image Blue represents the AOI, and Red represents the
              tiles corresponding to it. In our case, we have 100s of tiles
              covering whole Karnataka and upon drawing any region in Karnataka,
              we will get the tiles intersecting that AOI.
            </span>
          </div>
          <img src="/aoiExample.png" className="mt-4" />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HelpModal;
