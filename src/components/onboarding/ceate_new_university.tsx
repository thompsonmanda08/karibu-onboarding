"use client";
import React, { useEffect, useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { UNIVERSITIES, University } from "@/app/univarsities";
import { useFilter } from "@react-aria/i18n";

export default function CreateNewUniversity({
  handleSave,
  isOpen: show,
  onOpenChange: openModal,
  editUniversityField,
  handleClose,
  loading,
}: any) {
  const [value, setValue] = React.useState<any>(undefined);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  useEffect(() => {
    if (value != 0) {
      let selectedItem = UNIVERSITIES.find((item) => item.id == value);
      setSelectedItem(selectedItem);
      editUniversityField({
        name: selectedItem?.name,
        location: selectedItem?.location,
      });
    }
  }, [value]);

  return (
    <Modal isOpen={show} onOpenChange={openModal} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add University
            </ModalHeader>
            <ModalBody>
              {/*  */}
              <Autocomplete
                label="University"
                variant="bordered"
                defaultItems={UNIVERSITIES}
                placeholder="Search for university"
                className="max-w-md"
                selectedKey={value}
                onSelectionChange={setValue}
              >
                {(item) => (
                  <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
                )}
              </Autocomplete>

              {value == 0 && (
                <Input
                  autoFocus
                  label="Name"
                  variant="bordered"
                  placeholder="IWBC University"
                  className="mt-px"
                  onChange={(e) => {
                    editUniversityField({ name: e.target.value });
                  }}
                />
              )}
              {value != 0 && (
                <Input
                  label="Location"
                  isReadOnly
                  variant="bordered"
                  value={selectedItem?.location}
                  className="mt-px"
                />
              )}

              {value == 0 && (
                <Input
                  label="Location"
                  variant="bordered"
                  placeholder="Area and City"
                  onChange={(e) => {
                    editUniversityField({ location: e.target.value });
                  }}
                  className="mt-px"
                />
              )}
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
                onPress={() => {
                  handleSave();
                  handleClose(onClose);
                  setValue(undefined);
                  setSelectedItem(null);
                }}
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
