import React, {FC} from 'react';
import {
    Avatar,
    Badge,
    Button,
    Center,
    Container,
    createStyles,
    Divider,
    Group,
    Image,
    Loader,
    Paper,
    Text,
    Textarea,
    Title,
    TypographyStylesProvider
} from "@mantine/core";
import {Carousel} from "@mantine/carousel";
import {Tag} from "@/Models/Tag";
import {Toy} from "@/Models/Toy";
import {useQuery} from "@tanstack/react-query";
import {fetchTaskById} from "@/services/TasksService";
import CommentListItem from "@/Components/CommentListItem";
import {useForm} from "@mantine/form";
import {useAddTaskCommentMutation} from "@/queries/useAddTaskCommentMutation";
import useTaskCommentsQuery from "@/queries/useTaskCommentsQuery";
import {motion} from "framer-motion";
import {RemirrorRenderer} from "@remirror/react";
import {router} from "@/routes";
import {encodeJson} from "use-query-params";

const useStyles = createStyles((theme) => ({}));


interface AddCommentFormValues {
    comment: string;
}

const ViewTask: FC<any> = () => {
        // @ts-ignore
        const {params: {taskId}} = router.useMatch<any>('/tasks/:taskId');
        console.log("taskId", taskId);
        const {data: task, isLoading: taskLoading} = useQuery(["tasks", taskId], () => fetchTaskById(taskId));
        const {data: comments, isLoading: commentsLoading} = useTaskCommentsQuery(taskId);
        const {classes, theme} = useStyles();
        const form = useForm<AddCommentFormValues>({initialValues: {comment: ''}});
        const addTaskCommentMutation = useAddTaskCommentMutation();
        // const html = useMemo(() => {
        //     if (task?.content) {
        //         return edjsParser.parse(JSON.parse(task.content)).join("");
        //     }
        //     return '';
        // }, [task]);
        function onAddCommentFormSubmit(values: AddCommentFormValues) {
            console.log("onAddCommentFormSubmit", values);
            if (taskId) {
                const dataToSend = {taskId, ...values};
                console.log("dataToSend", dataToSend);
                addTaskCommentMutation.mutate(dataToSend);
            }
        }

        return (
            <motion.div layoutId={`task-card-${taskId}`}>
                <Container p={0}>
                    {taskLoading ? <Center style={{height: '100%'}} mt={48}><Loader size={150}/></Center> :
                        <Paper shadow={'sm'} p="md" m={0}>
                            <Group position="apart" title='??????????'>
                                <Title order={1}>{task.title}</Title>
                                {task.author ? <Group>
                                    <Avatar src={task.author.avatar} alt={task.author.name} radius="xl" size={'sm'}/>
                                    <div>
                                        <Text weight={500}>
                                            {task.author.name}
                                        </Text>
                                    </div>
                                </Group> : null}
                            </Group>
                            {task.tags?.length ?
                                <>
                                    <Divider my="xs" label="????????" labelPosition="center"/>
                                    <Group spacing={7} mt={5}>
                                        {task.tags.map((tag: Tag) => (
                                            <Badge
                                                color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
                                                key={tag?.tag_id}
                                            >
                                                {tag?.name}
                                            </Badge>
                                        ))}
                                    </Group>
                                </>
                                : null}
                            {task.toys?.length ?
                                <>
                                    <Divider my="xs" label="?????????????????? ??????????????????" labelPosition="center"/>
                                    <Carousel
                                        withIndicators
                                        height={200}
                                        mx="auto"
                                        slideSize="20%"
                                        slideGap="sm"
                                        slidesToScroll={5}
                                        breakpoints={[
                                            {maxWidth: 'md', slideSize: '50%'},
                                            {maxWidth: 'sm', slideSize: '100%', slideGap: 0},
                                        ]}
                                        align="start"
                                    >
                                        {task.toys.map((toy: Toy) => (
                                            <Carousel.Slide key={toy.title}>
                                                <Paper shadow="md" radius="md" p="sm">
                                                    <Center>
                                                        {toy.image ? <Image
                                                            width={100}
                                                            radius="md"
                                                            src={toy.image.thumbnail_url}
                                                            alt={toy.image.alt}
                                                        /> : null}
                                                    </Center>
                                                    <Center>
                                                        <Text size="lg" weight={500} mt="md">
                                                            {toy.title}
                                                        </Text>
                                                    </Center>
                                                    {/*<Text size="sm" color="dimmed" mt="sm">*/}
                                                    {/*    {toy.description}*/}
                                                    {/*</Text>*/}
                                                </Paper>
                                            </Carousel.Slide>
                                        ))}
                                    </Carousel>
                                </>
                                : null}
                            {task?.content ? <>
                                <Divider my="xs" label="?????????? ??????????????" labelPosition="center"/>
                                <TypographyStylesProvider>
                                    <RemirrorRenderer json={{
                                        type: 'doc',
                                        content: []
                                    }}/>
                                </TypographyStylesProvider>
                            </> : null}
                        </Paper>}
                    <Paper>
                        {comments?.map((comment) => <CommentListItem key={comment.id} comment={comment}/>)}
                        <form onSubmit={form.onSubmit((values) => {
                            onAddCommentFormSubmit(values)
                        })}>
                            <Group position="right" mt="md">
                                <Textarea  {...form.getInputProps('comment')}
                                           placeholder="???????????????? ??????????????????????..."
                                />
                                <Button type="submit">??????????????????</Button>
                            </Group>
                        </form>
                    </Paper>
                </Container>
            </motion.div>
        );
    }
;

export default ViewTask;
