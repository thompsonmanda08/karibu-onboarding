"use client";

import { cn, notify } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import CreateNewUniversity from "./ceate_new_university";

import { FaBuildingFlag, FaXmark } from "react-icons/fa6";
import { HiOutlinePlus } from "react-icons/hi";
import Loader from "../Loader";
import Image from "next/image";

type University = {
  name: string;
  location: string;
  [x: string]: any;
};

function Universities({ updateUserDetails, selectedUniversities }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = React.useState(false);
  const [newUniversity, setNewUniversity] = useState<University>({
    name: "",
    location: "",
  });

  const [closeByUniversities, setCloseByUniversities] = useState<University[]>(
    []
  );

  function handleUpdateFields(fields: any) {
    setNewUniversity((prev) => {
      return { ...prev, ...fields };
    });
  }

  function handleClose(onClose: any) {
    setNewUniversity({
      name: "",
      location: "",
    });
    onClose();
  }

  async function handleCreateNewUniversity() {
    setLoading(true);

    if (!newUniversity?.name || !newUniversity.location) {
      notify("error", "Provide valid name and location!");
      setLoading(false);
      return;
    }

    setCloseByUniversities((prev) =>
      Array.from(new Set([...prev, newUniversity]))
    );

    notify("success", "University Added!");
    // updateUserDetails({
    //   universities: selectedUniversities
    //     ? closeByUniversities //.concat(newUniversity)
    //     : [newUniversity],
    // });

    setLoading(false);
    onOpenChange();
  }

  function removeIndex(index: number) {
    setCloseByUniversities((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  }

  useEffect(() => {
    updateUserDetails({
      universities: closeByUniversities,
    });
  }, [closeByUniversities]);

  return (
    <>
      <Card className={cn("gap-6 p-2  w-full min-h-80 shadow-lg mt-8")}>
        {!isSelected && (
          <CardHeader className={"flex w-full flex-col gap-1"}>
            <Button
              onPress={onOpen}
              size="lg"
              isDisabled={loading}
              variant="flat"
              color="primary"
              className={" w-full"}
            >
              <HiOutlinePlus className="aspect-square w-4" />
              Add
            </Button>
          </CardHeader>
        )}
        <CardBody className="self-start items-start pt-0 mt-0">
          {isSelected ? (
            <div className="object-contain max-w-sm">
              <Image
                className=""
                src={`/images/done.svg`}
                alt="Complete Application Illustration"
                unoptimized
                width={300}
                height={300}
              />
            </div>
          ) : (
            <UniversitiesList
              isLoading={loading}
              list={closeByUniversities}
              removeIndex={removeIndex}
            />
          )}
        </CardBody>

        <CardFooter>
          <Checkbox
            className="items-start"
            classNames={{
              label: "text-small text-slate-700 -mt-1",
            }}
            isSelected={isSelected}
            onValueChange={setIsSelected}
          >
            In the case that you are not located near any university but still
            want to be able to have your property listed on our platform, check
            the box and you will be allowed to proceed
          </Checkbox>
        </CardFooter>
      </Card>

      <CreateNewUniversity
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleSave={handleCreateNewUniversity}
        setNewUniversity={setNewUniversity}
        editUniversityField={handleUpdateFields}
        handleClose={handleClose}
        loading={loading}
      />
    </>
  );
}

export function UniversitiesList({ isLoading, list = [], removeIndex }: any) {
  return (
    <div className="flex w-full flex-col items-center justify-center mt-4">
      {isLoading ? (
        <Loader size={60} loadingText={"Loading..."} />
      ) : (
        <div
          className={cn("grid w-full place-items-center gap-4 rounded-lg", {
            "grid-cols-[repeat(auto-fill,minmax(400px,1fr))]": list?.length > 0,
          })}
        >
          {list &&
            list?.map(({ name, location }: University, index: number) => {
              return (
                <div className="flex w-full relative">
                  <Button
                    className={cn(
                      "flex h-auto w-full justify-start gap-4 border-[1px] border-primary/20 bg-transparent p-2 opacity-100 hover:border-primary/50 hover:bg-primary/5"
                    )}
                    startContent={
                      <div
                        className={cn(
                          "z-10 grid aspect-square h-12 w-12 place-items-center rounded-lg bg-gradient-to-tr from-primary to-secondary/80 p-3 text-white transition-all duration-300 ease-in-out"
                        )}
                      >
                        <FaBuildingFlag className="h-6 w-6 self-center" />
                      </div>
                    }
                  >
                    <div className="flex flex-col items-start">
                      <h3 className="heading-4 mb-1 capitalize text-secondary font-bold">
                        {name}
                      </h3>
                      {location && (
                        <div className="flex max-w-[260px] justify-between gap-2">
                          <p className=" truncate text-sm font-medium text-slate-400">
                            {location}
                          </p>
                        </div>
                      )}
                    </div>
                  </Button>
                  <Tooltip
                    content="Remove University"
                    color="danger"
                    placement="top"
                  >
                    <Button
                      onPress={() => removeIndex(index)}
                      isIconOnly
                      variant="light"
                      size="sm"
                      className="absolute top-[25%] right-4 cursor-pointer"
                    >
                      <FaXmark className="w-8 h-8 font-normal p-2 rounded-full ml-auto hover:bg-red-500/10 text-red-300  transition-all ease-in-out duration-300 hover:text-red-500 " />
                    </Button>
                  </Tooltip>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Universities;
