"use client";
import { useState } from "react";

import { PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { Spinner } from "@/components/spinner";
import MyToggle from "./toggle";

import axios from "axios";

const formSchema = z.object({
    task: z.string(),
    duration: z.number().min(1, {
        message: "number must not be empty.",
    }),
    context: z.string(),
    priority: z.number().min(1, {
        message: "number must not be empty.",
    }),
    start_at: z.string(),

});

const AddBtn = () => {

    const [task, setTask] = useState("");
    const [duration, setDuration] = useState(0);
    const [context, setContext] = useState("");
    const [priority, setPriority] = useState(0);
    const [start_at, setStart_at] = useState("");
    
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [enabled, setEnabled] = useState(false);
  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: "",
            duration: 0,
            context: "",
            priority: 0,
            start_at: "",
        },
    });
    //localhost:4000/task/create


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            setLoading(true)
            const res = await axios.post("http://localhost:4000/task/create",{
                task,
                duration,
                context,
                priority,
                start_at

            });
            if (res) {
                setLoading(false);
                setOpen(false);
              } else {

                setLoading(false);
              }
        }catch(err){
            console.log(err)
        }
    }    


    return (
        <>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild>
                    
                        <PlusCircle size={28} className="text-blue-500 ml-2" />
                   
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add {enabled ? "appointment" : "task"}</DialogTitle>
                        <DialogDescription className="flex flex-col items-center justify-center gap-1">
                            click on the toggle to change the form
                            <MyToggle enabled={enabled} setEnabled={setEnabled} />
                        </DialogDescription>
                    </DialogHeader>
                    <div>

                        <Form {...form}>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="task"
                                    render={(field) => (
                                        <FormItem>
                                            <FormLabel>Task</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your task"
                                                    {...field}
                                                    onChange={(e) => setTask(e.target.value)}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {
                                    enabled ? (
                                        <FormField
                                            control={form.control}
                                            name="start_at"
                                            render={(field) => (
                                                <FormItem>
                                                    <FormLabel>Start At</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your start time"
                                                            {...field}
                                                            onChange={(e) => setStart_at(e.target.value)}
                                                            required
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ) : (
                                        <FormField
                                            control={form.control}
                                            name="priority"
                                            render={(field) => (
                                                <FormItem>
                                                    <FormLabel>Priority</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your priority"
                                                            {...field}
                                                            onChange={(e) => setPriority(parseInt(e.target.value))}
                                                            required
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )
                                }

                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={(field) => (
                                        <FormItem>
                                            <FormLabel>Duration</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your duration"
                                                    {...field}
                                                    onChange={(e) => setDuration(parseInt(e.target.value))}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="context"
                                    render={(field) => (
                                        <FormItem>
                                            <FormLabel>Context</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your context"
                                                    {...field}
                                                    onChange={(e) => setContext(e.target.value)}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                {loading ? (
                                    <div className="text-5xl font-bold flex items-center justify-center">
                                        <Spinner size="lg" />
                                    </div>
                                ) : (
                                    <Button type="submit" className="w-full">
                                        Submit
                                    </Button>
                                )}
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddBtn;