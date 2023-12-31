"use client";

import * as z from "zod";
import axios from "axios"
import { useForm } from "react-hook-form";
import { useState } from "react";
import {toast} from "react-hot-toast"

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        setLoading(true);

        const response = await axios.post('/api/stores', values)

        window.location.assign(`/${response.data.id}`);
    } catch (error) {
        toast.error("Something went wrong...");
    }finally {
        setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new Store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="py-2 pb-4 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        disabled={loading} 
                        placeholder="E-Commerce" {...field} 
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end items-center pt-6 space-x-2 w-full">
                <Button 
                    variant="outline" 
                    disabled={loading} 
                    onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button 
                    type="submit"
                    disabled={loading} 
                >
                    Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
