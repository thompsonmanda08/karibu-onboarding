"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@nextui-org/react";

export default function CreateNewUniversity({
  handleSave,
  isOpen,
  onOpenChange,
  editUniversityField,
  handleClose,
  loading,
}: any) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add University
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Name"
                placeholder="University of Zambia"
                className="mt-px"
                onChange={(e) => {
                  editUniversityField({ name: e.target.value });
                }}
              />
              <Input
                label="Location"
                placeholder="Area and City"
                onChange={(e) => {
                  editUniversityField({ location: e.target.value });
                }}
                className="mt-px"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                isDisabled={loading}
                onPress={() => handleClose(onClose)}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                isLoading={loading}
                isDisabled={loading}
                onPress={() => handleSave(onClose)}
              >
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
