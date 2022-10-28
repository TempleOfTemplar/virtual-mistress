import React, {useEffect, useMemo} from 'react';
import {Button, Center, Container, Group, Input, Loader, MultiSelect, Select, Textarea, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchToys} from "@/services/ToysService";
import {fetchTags} from "@/services/TagsService";
import {fetchCategories} from "@/services/CategoriesService";
import {createTask, editTask, fetchTaskById} from "@/services/TasksService";
import {Task} from "@/Models/Task";
import {useTheme} from "@emotion/react";
import api from "@/utils/Api";
import {Tag} from "@/Models/Tag";
import {Toy} from "@/Models/Toy";
import {Category} from "@/Models/Category";
import {
    BasicFormattingButtonGroup, DataTransferButtonGroup,
    EditorComponent, HeadingLevelButtonGroup, HistoryButtonGroup, MarkdownToolbar,
    Remirror,
    ThemeProvider,
    Toolbar,
    useRemirror, VerticalDivider
} from "@remirror/react";
import {
    BlockquoteExtension,
    BoldExtension, BulletListExtension,
    CalloutExtension, CodeBlockExtension, CodeExtension, HardBreakExtension, HeadingExtension,
    ItalicExtension,
    LinkExtension, ListItemExtension,
    MarkdownExtension, OrderedListExtension,
    StrikeExtension, TableExtension, TrailingNodeExtension
} from "remirror/extensions";
import {motion} from "framer-motion";
import ReMirrorEditor, {DualEditor} from "@/Components/ReMirror/ReMirrorEditor";
import {router} from "@/routes";
import {ExtensionPriority, getThemeVar} from "remirror";
import {css} from "@emotion/css";
import { AllStyledComponent } from '@remirror/styles/emotion';
import markdown from 'refractor/lang/markdown.js';
import {StarterKit} from "@tiptap/starter-kit";
import {EditorContent, useEditor} from "@tiptap/react";

const CreateOrEditTask = () => {
        // @ts-ignore
        const {params: {taskId}, navigate} = router.useMatch('/tasks/:taskId/edit')

        const theme: any = useTheme();
        const editMode = useMemo(() => {
            return !(taskId === undefined);
        }, [taskId]);
        const {data: task, isLoading: taskLoading} = useQuery(["tasks", taskId], () => fetchTaskById(taskId), {
            enabled: editMode
        });
        const queryClient = useQueryClient();
        useEffect(() => {
            if (task) {
                form.setValues({
                    id: task.id,
                    title: task.title,
                    excerpt: task.excerpt,
                    category_id: task.category_id.toString(),
                    tags: task.tags ? task.tags.map((tag: Tag) => tag.tag_id) : [],
                    toys: task.toys ? task.toys.map((toy: Toy) => toy.id) : [],
                    content: task.content
                });
            }
        }, [task]);

        // useEffect(() => {
        //     if (!loading) {
        //         const instance = getInstance();
        //         instance?.action((ctx) => {
        //             ctx;
        //             // do something
        //         });
        //     }
        // }, [getInstance, loading]);

        const form = useForm({
            initialValues: {
                title: '',
                excerpt: '',
                toys: [],
                tags: [],
                category_id: '',
                content: ''
            },

            validate: {
                title: (value) => value.length > 0 ? null : "Пожалуйста введите пароль",
            },
        });

        const {
            isLoading: toysLoading,
            error: toysError,
            data: toysList,
        } = useQuery(["toys"], fetchToys);
        const {
            isLoading: tagsLoading,
            error: tagsError,
            data: tagsList,
        } = useQuery(["tags"], fetchTags);
        const {
            isLoading: categoriesLoading,
            error: categoriesError,
            data: categoriesList,
        } = useQuery(["categories"], fetchCategories);

        const toysItems = useMemo(() => {
            return toysList ? toysList.map((toy: Toy) => {
                return {value: toy.id, label: toy.title}
            }) : [];
        }, [toysList]);

        const tagsItems = useMemo(() => {
            return tagsList ? tagsList.map((tag: Tag) => {
                return {value: tag.tag_id, label: tag.name}
            }) : [];
        }, [tagsList]);

        const categoriesItems = useMemo(() => {
            return categoriesList ? categoriesList.map((category: Category) => {
                return {value: category.id.toString(), label: category.title}
            }) : [];
        }, [categoriesList]);

        const useUpdateTask = useMutation(
            editTask,
            {
                onMutate: async (taskToUpdate: Task) => {
                    await queryClient.cancelQueries(['tasks']);
                    const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
                    if (previousTasks) {
                        const taskToUpdateIndex = previousTasks.findIndex(task => task.id === taskToUpdate.id);
                        const tasksToUpdate = JSON.parse(JSON.stringify(previousTasks));
                        Object.assign(tasksToUpdate[taskToUpdateIndex], taskToUpdate);
                        console.log("tasksToUpdate[taskToUpdateIndex]", tasksToUpdate[taskToUpdateIndex]);
                        queryClient.setQueryData<Task[]>(["tasks"], [
                            ...tasksToUpdate,
                        ])
                    }
                    return previousTasks ? {previousTasks} : {previousTasks: []};
                },
                // If the mutation fails, use the context returned from onMutate to roll back
                onError: (err, variables, context) => {
                    if (context) {
                        queryClient.setQueryData<Task[]>(['tasks'], [...context.previousTasks])
                    }
                },
                // Always refetch after error or success:
                onSuccess: () => {
                    navigate({to: -1});
                    // queryClient.cancelQueries(['tasks'])
                    // queryClient.invalidateQueries(['todos'])
                },
            },
        );

        const useCreateTask = useMutation(
            createTask,
            {
                // When mutate is called:
                // onMutate: async (taskToUpdate: Task) => {
                //     await queryClient.cancelQueries(['tasks']);
                //     const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
                //     if (previousTasks) {
                //         const taskToUpdateIndex = previousTasks.findIndex(task => task.id.toString() === taskToUpdate.id.toString());
                //         const tasksToUpdate = JSON.parse(JSON.stringify(previousTasks));
                //         // tasksToUpdate[taskToUpdateIndex].has_favorited = !tasksToUpdate[taskToUpdateIndex].has_favorited;
                //         Object.assign(tasksToUpdate[taskToUpdateIndex], taskToUpdate);
                //         // console.log("tasksToUpdate[taskToUpdateIndex]", tasksToUpdate[taskToUpdateIndex]);
                //         queryClient.setQueryData<Task[]>(["tasks"], [
                //             ...tasksToUpdate,
                //         ])
                //     }
                //     return previousTasks ? {previousTasks} : {previousTasks: []};
                // },
                // // If the mutation fails, use the context returned from onMutate to roll back
                // onError: (err, variables, context) => {
                //     if (context) {
                //         queryClient.setQueryData<Task[]>(['tasks'], [...context.previousTasks])
                //     }
                // },
                // Always refetch after error or success:
                onSuccess: (data) => {
                    console.log("data", data);
                    //const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
                    //const taskToUpdateIndex = previousTasks.findIndex(task => task.id.toString() === taskToUpdate.id.toString());
                    // console.log(queryClient.getQueryCache().getAll());
                    const queryFromListPage = queryClient.getQueryCache().getAll().filter(query => {
                        return query.queryKey[0] === "task";
                    });
                    if (queryFromListPage?.length) {
                        queryFromListPage.forEach(queryFromListPageItem => {
                            queryFromListPageItem.invalidate();
                        })
                    }
                    navigate({to: '/tasks/my'});
                    // queryClient.cancelQueries(['tasks'])
                    // queryClient.invalidateQueries(['todos'])
                },
            },
        )


        function handleSubmit(e: any) {
            e.preventDefault();
            // const vditorValue = vditor?.getValue();
            // if (vditorValue) {
            //     form.values.content = vditorValue;
            // }
            return;
            if (editMode) {
                useUpdateTask.mutate(form.values as any);
            } else {
                useCreateTask.mutate(form.values as any);
            }
        }

        // const handleImageUpload = useCallback(
        //     (file: File): Promise<string> =>
        //         new Promise((resolve, reject) => {
        //             const formData = new FormData();
        //             formData.append('image', file);
        //
        //             fetch('https://api.imgbb.com/1/upload?key=api_key', {
        //                 method: 'POST',
        //                 body: formData,
        //             })
        //                 .then((response) => response.json())
        //                 .then((result) => resolve(result.data.url))
        //                 .catch(() => reject(new Error('Upload failed')));
        //         }),
        //     []
        // );
        // const mdParser = new MarkdownIt(/* Markdown-it options */);

    function handleEditorChange(val: any) {
        console.log(val);
    }
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '<p>Hello World!</p>',
    })
        return (
            <motion.div layoutId={`task-card-${taskId}`}>
                <Container>
                    {editMode && taskLoading ? <Center mt={48}><Loader size={150}/></Center> :
                        <form name="createForm" onSubmit={handleSubmit}>
                            <TextInput name="title"
                                       label="Заголовок"
                                       withAsterisk
                                       {...form.getInputProps('title')}/>
                            <Textarea
                                name="excerpt"
                                placeholder=""
                                label="Краткое описание"
                                withAsterisk
                                {...form.getInputProps('excerpt')}
                            />
                            <MultiSelect name="toys"
                                         label={"Инвентарь"}
                                         data={toysItems}
                                         {...form.getInputProps('toys')}
                            />
                            <MultiSelect name="tags"
                                         label={"Теги"}
                                         data={tagsItems}
                                         {...form.getInputProps('tags')}
                            />
                            <Select name="category_id"
                                    label={"Категория"}
                                    data={categoriesItems}
                                    {...form.getInputProps('category_id')}
                            />
                            <Input.Wrapper label="Текст задания" data-color-mode={theme.colorScheme}
                                           className='remirror-theme'>
                                <EditorContent editor={editor} />
                                {/*<DualEditor onMarkdownChange={handleEditorChange}/>*/}
                                {/*<Remirror manager={manager} initialContent={state} >*/}

                                {/*    /!*<EditorComponent />*!/*/}
                                {/*</Remirror>*/}
                            </Input.Wrapper>
                            <Group position="right" mt="md">
                                <Button type={"submit"}>{editMode ? 'Сохранить' : 'Отправить на модерацию'}</Button>
                            </Group>
                        </form>
                    }
                </Container>
            </motion.div>
        );
    }
;

export default CreateOrEditTask;
