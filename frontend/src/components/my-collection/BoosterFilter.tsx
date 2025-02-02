"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Label } from "../ui/label";
import { FilterFormProps } from "./FilterForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useEffect, useState } from "react";
import { api } from "@/lib/http";
import Image from "next/image";
import { CardBoosterMyCollectionApiResponse } from "@/app/api/card-booster/my-collection/route";

export type BoosterFilterProps = FilterFormProps;

const getBoosters = async (expansionSetCode: string) => {
  const response = await api.get<CardBoosterMyCollectionApiResponse>(
    "card-booster/my-collection",
    {
      params: { expansionSetCode },
    },
  );
  if (!response.status) {
    throw new Error("Failed to fetch user data");
  }
  return response.data;
};

export default function BoosterFilter({
  form,
  expansionSetCode,
}: BoosterFilterProps) {
  const [expansionSetWithBoosters, setExpansionSetWithBoosters] =
    useState<CardBoosterMyCollectionApiResponse | null>(null);
  const boosters = expansionSetWithBoosters?.cardBoosters ?? [];

  useEffect(() => {
    const fecthData = async () => {
      const data = await getBoosters(expansionSetCode);
      setExpansionSetWithBoosters(data);
    };
    fecthData();
  }, [expansionSetCode]);

  return (
    <FormField
      control={form.control}
      name="booster"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              defaultValue="all"
              className="flex flex-row gap-2"
              onValueChange={(value) => field.onChange(value)}
            >
              {expansionSetWithBoosters !== null && (
                <div className="flex flex-row items-center">
                  <RadioGroupItem value={"all"} id={"all"} />
                  <Label htmlFor={"all"}>
                    <Image
                      alt={expansionSetWithBoosters.name}
                      src={expansionSetWithBoosters.imagePath ?? ""}
                      height={50}
                      width={100}
                      className="h-auto w-auto"
                    />
                  </Label>
                </div>
              )}

              {boosters.map((booster) => (
                <div key={booster.id} className="flex flex-row items-center">
                  <RadioGroupItem
                    value={String(booster.id)}
                    id={String(booster.id)}
                  />
                  <Label htmlFor={String(booster.id)}>
                    <Image
                      alt={booster.name}
                      src={booster.imagePath ?? ""}
                      height={50}
                      width={50}
                      className="h-auto w-auto"
                    />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
