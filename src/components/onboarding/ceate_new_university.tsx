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
import { useQuery } from "@tanstack/react-query";
import { getAllUniversities } from "@/app/actions";

export default function CreateNewUniversity({
  handleSave,
  isOpen: show,
  onOpenChange: openModal,
  editUniversityField,
  handleClose,
  setNewUniversity,
  loading,
}: any) {
  const [value, setValue] = React.useState<any>(undefined);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  const { data: universityResponse } = useQuery({
    queryKey: ["universities"],
    queryFn: async () => getAllUniversities(),
    staleTime: 0,
  });

  const UNIVERSITIES = universityResponse?.data || [];

  useEffect(() => {
    // ID VALUE FOR OTHER IS 1
    if (value != 1) {
      let selectedItem = UNIVERSITIES.find((item) => item.id == value);
      setSelectedItem(selectedItem);
      setNewUniversity(selectedItem);
    } else {
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

              {value == 1 && (
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
              {value != 1 && (
                <Input
                  label="Location"
                  isReadOnly
                  variant="bordered"
                  value={selectedItem?.location}
                  className="mt-px"
                />
              )}

              {value == 1 && (
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
