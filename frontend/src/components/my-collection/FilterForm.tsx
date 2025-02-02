"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import BoosterFilter from "./BoosterFilter";

export const formSchema = z.object({
  name: z.string(),
  max5Cards: z.boolean(),
  onlyMissingCards: z.boolean(),
  booster: z.string(),
});

export type FilterFormType = z.infer<typeof formSchema>;

export interface FilterFormProps {
  form: UseFormReturn<FilterFormType>;
  expansionSetCode: string;
}

export default function FilterForm({
  form,
  expansionSetCode,
}: FilterFormProps) {
  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-center gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Search by name or number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="max5Cards"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Label htmlFor="max5Cards">5 cards per row</Label>
          </div>
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="onlyMissingCards"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Label htmlFor="max5Cards">Only Missing Cards</Label>
          </div>
        </div>
        <BoosterFilter form={form} expansionSetCode={expansionSetCode} />
      </form>
    </Form>
  );
}
