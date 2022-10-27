import React, {FC, useRef, useState} from 'react';
import {Task} from "@/Models/Task";
import {Badge, Button, Card, Row, Text, Tooltip, Grid, Popover, Image} from "@nextui-org/react";
import classNames from "classnames";
import {useSanctum} from "react-sanctum";
import {RWebShare} from "react-web-share";
import {motion, useAnimationControls, useMotionValue, useTransform} from "framer-motion";
import {Link} from "@tanstack/react-location";
import {HiOutlineBookmark, HiOutlineChatBubbleLeftEllipsis, HiOutlineHeart, HiOutlineShare} from "react-icons/hi2";
import classes from './task-card.module.css'
import {Tag} from "@/Models/Tag";
import {Toy} from "@/Models/Toy";
import CommentListItem from "@/Components/CommentListItem";

interface TaskCardProps {
    task: Task;
    setFavorite?: (task: Task) => void
    setLike?: (task: Task) => void
}

// const onElementAppear = (el: any, index: any) => {
//     el.classList.remove("animated-card-out");
// }
//
// const onExit = (el: any, index: any, removeElement: any) => {
//     // el.classList.remove("animated-card-in");
//     el.classList.add("animated-card-out");
//     setTimeout(removeElement, 200);
// };

const TaskCard: FC<TaskCardProps> = ({task, setFavorite, setLike}) => {
    const ref = useRef(null)
    // const isInView = useInView(ref)
    const [commentsOpened, setCommentsOpened] = useState<boolean>(false);
    const {user} = useSanctum();
    const [linkToTask, setLinkToTask] = useState(`${window.location.protocol}${window.location.hostname}/tasks/${task.id}`);
    const [sitesToShare,] = useState([
        'copy',
        'telegram',
        'vk',
        'whatsapp'
    ]);
    const [flipped, setFlipped] = useState(false);

    // const bind = useDrag(state => {
    //     const {
    //         swipe,         // [swipeX, swipeY] 0 if no swipe detected, -1 or 1 otherwise
    //         tap,           // is the drag assimilated to a tap
    //     } = state
    // })


    function toggleComments(): void {
        setCommentsOpened(!commentsOpened);
    }

    const controls = useAnimationControls();

    const x = useMotionValue(0);
    const rotateY = useTransform(x, [-200, 0, 200], [-90, 0, 90], {
        clamp: true,
    })


    // const animateCardFlip = () => {
    //     setDragStart({ ...dragStart, animation });
    //
    //     setTimeout(() => {
    //         setDragStart({ axis: null, animation: { x: 0, y: 0 } });
    //         x.set(0);
    //         y.set(0);
    //         setCards([{
    //             text: 'just an another card',
    //             background: randomColor(cards[0].background)
    //         }, ...cards.slice(0, cards.length - 1)]);
    //     }, 200);
    // }
    /*perspective(1000px) */
    // function handlePan(_: any, info: PanInfo) {
    //     // controls.set({
    //     //     rotateY: info.offset.x / 2,
    //     // });
    //     x.set(info.offset.x);
    //     // console.log(ref.current.clientWidth)
    //
    // }

    // const handlePanEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    //     if(info.offset.x < 150) {
    //         controls.start({
    //             rotateY: 0,
    //         });
    //     } else {
    //         controls.start({
    //             rotateY: 180,
    //         });
    //     }
    // };

    return (
        <motion.div className={classes.flipContainer}
                    transition={{duration: 0.3}}
                    animate={{
                        rotateY: flipped ? 180 : 0
                    }}
                    layoutId={`task-card-${task.id}`}
                    ref={ref}>
            <Card variant="bordered" className={classNames(classes.card, classes.faceFront)}>
                <Card.Header>
                    <Text b>{task.title}</Text>
                </Card.Header>
                <Card.Divider/>
                <Card.Body>
                    <Text>
                        {task.excerpt}
                    </Text>
                </Card.Body>
                <Card.Divider/>
                <Card.Body className={classes.tagsCardBody}>
                    {task.tags?.length ?
                        <Grid.Container gap={0.5} justify="flex-start" className={classes.tagsSection}>
                            {task.tags.map((tag: Tag) => (
                                <Grid>
                                    <Badge size="sm" color="secondary" variant="bordered" key={tag?.tag_id}>
                                        {tag?.name}
                                    </Badge>
                                </Grid>
                            ))}
                        </Grid.Container>
                        : <div style={{width: '100%'}} className={classes.tagsSection}>
                            <Text color="dimmed">У этого задания нет тегов</Text>
                        </div>}
                </Card.Body>
                <Card.Divider/>
                <Card.Body className={classes.toysCardBody}>
                    {task.toys?.length ?
                        <Grid.Container gap={0.5} justify="flex-start" className={classes.toysSection}>
                            {task.toys.map((toy: Toy) => (
                                <Grid>
                                    <Popover>
                                        <Popover.Trigger>
                                            <Badge size="sm" key={toy?.id} color="warning" variant="bordered">
                                                {toy.title}
                                            </Badge>
                                        </Popover.Trigger>
                                        <Popover.Content>
                                             <Image
                                                width={120}
                                                height={120}
                                                src={toy.image}
                                                alt={toy.title}
                                                objectFit="cover"
                                            />
                                        </Popover.Content>
                                    </Popover>

                                </Grid>
                            ))}
                        </Grid.Container>
                        : <div style={{width: '100%'}} className={classes.toysSection}>
                            <Text className={classes.label} color="dimmed">Инвентарь не требуется</Text>
                        </div>
                    }
                </Card.Body>
                <Card.Divider/>
                <Card.Footer>
                    <Row justify="flex-end">
                        <Button as={Link}
                                to={`/tasks/${task.id}`}
                                color="gradient"
                                auto
                                ghost>
                            Читать
                        </Button>
                        <Row justify="flex-end">
                            <Tooltip content={"Посмотреть комментарии"}>
                                <Button
                                    onClick={() => setFlipped(true)}
                                    auto
                                    ghost
                                    color="error"
                                    icon={<HiOutlineChatBubbleLeftEllipsis size={24} fill="currentColor"/>}
                                />
                            </Tooltip>
                            {setLike ?
                                <Button onClick={() => setLike(task)}
                                        auto
                                        ghost
                                        color="error"
                                        icon={<HiOutlineHeart size={24} fill="currentColor"/>}>
                                    {task.likers_count}
                                </Button>
                                : null}
                            {setFavorite ?
                                <Button onClick={() => setFavorite(task)}
                                        auto
                                        ghost
                                        color="error"
                                        icon={<HiOutlineBookmark fill="currentColor" size={24}/>}
                                        className={classNames(classes.bookmark, {[classes.bookmarkFilled]: task.has_favorited})}/>
                                : null}
                            <RWebShare
                                sites={sitesToShare}
                                disableNative={true}
                                data={{
                                    text: `Вам задание "${task.title}" от virtual-mistress`,
                                    url: linkToTask,
                                    title: "Поделиться заданием",
                                }}>
                                <Button auto
                                        ghost
                                        color="error"
                                        icon={<HiOutlineShare fill="currentColor" size={24}/>}/>
                            </RWebShare>
                        </Row>
                    </Row>
                </Card.Footer>
            </Card>
            <Card variant="bordered" className={classNames(classes.card, classes.faceBack)}>
                <Card.Body className={classes.commentsWrapper}>
                             {task.comments?.map((comment) => <CommentListItem key={comment.id} comment={comment}/>)}
                </Card.Body>
                <Card.Footer>
                    <Row justify="flex-end">
                        <Button as={Link}
                                to={`/tasks/${task.id}`}
                                color="gradient"
                                auto
                                ghost>
                            Читать
                        </Button>
                        <Row justify="flex-end">
                            <Tooltip content={"Посмотреть комментарии"}>
                                <Button
                                    onClick={() => setFlipped(false)}
                                    auto
                                    ghost
                                    color="error"
                                    icon={<HiOutlineChatBubbleLeftEllipsis size={24} fill="currentColor"/>}
                                />
                            </Tooltip>
                            {setLike ?
                                <Button onClick={() => setLike(task)}
                                        auto
                                        ghost
                                        color="error"
                                        icon={<HiOutlineHeart size={24} fill="currentColor"/>}>
                                    {task.likers_count}
                                </Button>
                                : null}
                            {setFavorite ?
                                <Button onClick={() => setFavorite(task)}
                                        auto
                                        ghost
                                        color="error"
                                        icon={<HiOutlineBookmark fill="currentColor" size={24}/>}
                                        className={classNames(classes.bookmark, {[classes.bookmarkFilled]: task.has_favorited})}/>
                                : null}
                            <RWebShare
                                sites={sitesToShare}
                                disableNative={true}
                                data={{
                                    text: `Вам задание "${task.title}" от virtual-mistress`,
                                    url: linkToTask,
                                    title: "Поделиться заданием",
                                }}>
                                <Button auto
                                        ghost
                                        color="error"
                                        icon={<HiOutlineShare fill="currentColor" size={24}/>}/>
                            </RWebShare>
                        </Row>
                    </Row>
                </Card.Footer>
            </Card>


            {/*<Card withBorder radius="md" p="md" className={classNames(classes.card, classes.faceFront)}>*/}
            {/*    <Card.Section className={classes.titleAndExcerptSection} py={4} px='xs' mt={0} mb={0}>*/}
            {/*        <Text size="lg" weight={500}>*/}
            {/*            {task.title}*/}
            {/*        </Text>*/}
            {/*        /!* TODO task.category <Badge size="sm">{task.category}</Badge>*!/*/}
            {/*        <ScrollArea style={{width: '100%', height: '100%'}} offsetScrollbars={true}>*/}
            {/*            <Text size="sm" mt={0}>*/}
            {/*                {task.excerpt}*/}
            {/*            </Text>*/}
            {/*        </ScrollArea>*/}
            {/*    </Card.Section>*/}
            {/*    <Card.Section py={4} px='xs' mt={0} mb={0}>*/}
            {/*        <Divider my={0} label="Теги" labelPosition="center"/>*/}
            {/*        {task.tags?.length ?*/}
            {/*            <ScrollArea style={{width: '100%'}}>*/}
            {/*                <Group spacing={4} mt={0} className={classes.tagsSection}>*/}
            {/*                    {task.tags.map((tag: Tag) => (*/}
            {/*                        <Badge*/}
            {/*                            size='md'*/}
            {/*                            variant='outline'*/}
            {/*                            color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}*/}
            {/*                            key={tag?.tag_id}*/}
            {/*                        >*/}
            {/*                            {tag?.name}*/}
            {/*                        </Badge>*/}
            {/*                    ))}*/}
            {/*                </Group>*/}
            {/*            </ScrollArea>*/}
            {/*            :*/}
            {/*            <Center style={{width: '100%'}} className={classes.tagsSection}><Text color="dimmed">У*/}
            {/*                этого*/}
            {/*                задания нет*/}
            {/*                тегов</Text></Center>}*/}
            {/*    </Card.Section>*/}


            {/*    <Card.Section py={4} px='xs' mt={0} mb={0}>*/}
            {/*        <Divider my={0} label="Инвентарь" labelPosition="center"/>*/}
            {/*        {task.toys?.length ?*/}
            {/*            <>*/}
            {/*                <ScrollArea style={{width: '100%', height: 50}}>*/}
            {/*                    <Grid m={0} p={0}>*/}
            {/*                        {task.toys.map((toy: Toy) => (*/}
            {/*                            // <Image*/}
            {/*                            //     width={50}*/}
            {/*                            //     radius="md"*/}
            {/*                            //     src={toy.image.thumbnail_url}*/}
            {/*                            //     alt={toy.title}*/}
            {/*                            //     caption={toy.title}*/}
            {/*                            // />*/}
            {/*                            <Col span="content" key={toy.id} m={0} p={0}>*/}
            {/*                                <Badge*/}
            {/*                                    size='md'*/}
            {/*                                    variant='filled'*/}
            {/*                                    color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}*/}

            {/*                                >*/}
            {/*                                    {toy.title}*/}
            {/*                                </Badge>*/}
            {/*                            </Col>*/}
            {/*                        ))}*/}
            {/*                    </Grid>*/}
            {/*                </ScrollArea>*/}
            {/*            </>*/}
            {/*            :*/}
            {/*            <Center style={{width: '100%', height: 50}}><Text mt="md" className={classes.label}*/}
            {/*                                                              color="dimmed">*/}
            {/*                Инвентарь не требуется*/}
            {/*            </Text></Center>}*/}
            {/*    </Card.Section>*/}


            {/*    {task.author ? <Group mt="lg" position="apart">*/}
            {/*        <Group>*/}
            {/*            <Avatar src={task.author.avatar} radius="sm"/>*/}
            {/*            <Text weight={500}>{task.author.name}</Text>*/}
            {/*        </Group>*/}
            {/*        {user && task.author.id === user.id ? <ActionIcon className={classes.editButton}*/}
            {/*                                                          component={Link}*/}
            {/*                                                          to={`/tasks/edit/${task.id}`}*/}
            {/*                                                          variant="default"*/}
            {/*                                                          radius="md"*/}
            {/*                                                          size={36}*/}
            {/*                                                          onClick={() => {*/}
            {/*                                                          }}>*/}
            {/*            <IconPencil size={18} stroke={1.5}/>*/}
            {/*        </ActionIcon> : null}*/}
            {/*    </Group> : null}*/}
            {/*    <Group mt="xs">*/}
            {/*    </Group>*/}

            {/*    <Card.Section className={classes.footer}>*/}
            {/*        <Group position="apart">*/}
            {/*            <Button component={Link} radius="md" to={`/tasks/${task.id}`}>*/}
            {/*                Читать*/}
            {/*            </Button>*/}
            {/*            <Group spacing={2}>*/}
            {/*                <Tooltip label="Посмотреть комментарии">*/}
            {/*                    <ActionIcon variant="default" radius="md" size={36}>*/}
            {/*                        <IconMessage size={18}*/}
            {/*                                     onClick={() => setFlipped(true)}*/}
            {/*                                     className={classNames(classes.comment)}*/}
            {/*                                     stroke={1.5}/>*/}
            {/*                    </ActionIcon>*/}
            {/*                </Tooltip>*/}
            {/*                {setLike ? <ActionIcon variant="default" radius="md" size={36}>*/}
            {/*                    <Text className={classes.likeCountText}>{task.likers_count}</Text>*/}
            {/*                    <IconHeart size={18}*/}
            {/*                               onClick={() => setLike(task)}*/}
            {/*                               className={classNames(classes.like, {[classes.likeFilled]: task.has_liked})}*/}
            {/*                               stroke={1.5}/>*/}
            {/*                </ActionIcon> : null}*/}
            {/*                {setFavorite ? <ActionIcon variant="default" radius="md" size={36}*/}
            {/*                                           onClick={() => setFavorite(task)}>*/}
            {/*                    <IconBookmark size={18}*/}
            {/*                                  className={classNames(classes.bookmark, {[classes.bookmarkFilled]: task.has_favorited})}*/}
            {/*                                  stroke={1.5}/>*/}
            {/*                </ActionIcon> : null}*/}
            {/*                <RWebShare*/}
            {/*                    sites={sitesToShare}*/}
            {/*                    disableNative={true}*/}
            {/*                    data={{*/}
            {/*                        text: `Вам задание "${task.title}" от virtual-mistress`,*/}
            {/*                        url: linkToTask,*/}
            {/*                        title: "Поделиться заданием",*/}
            {/*                    }}>*/}
            {/*                    <ActionIcon variant="default" radius="md" size={36}>*/}
            {/*                        <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5}/>*/}
            {/*                    </ActionIcon>*/}
            {/*                </RWebShare>*/}
            {/*            </Group>*/}
            {/*        </Group>*/}
            {/*    </Card.Section>*/}
            {/*</Card>*/}
            {/*<Card withBorder radius="md" p="md" className={classNames(classes.card, classes.faceBack)}>*/}
            {/*    <Card.Section className={classes.commentsWrapper}>*/}
            {/*        <ScrollArea className={classes.comments}>*/}
            {/*            {task.comments?.map((comment) => <CommentListItem key={comment.id} comment={comment}/>)}*/}
            {/*        </ScrollArea>*/}
            {/*    </Card.Section>*/}
            {/*    <Card.Section className={classes.footer}>*/}
            {/*        <Group position="apart">*/}
            {/*            <Button component={Link} radius="md" to={`/tasks/${task.id}`}>*/}
            {/*                Читать*/}
            {/*            </Button>*/}
            {/*            <Group spacing={2}>*/}
            {/*                <Tooltip label="Посмотреть комментарии">*/}
            {/*                    <ActionIcon variant="default" radius="md" size={36}>*/}
            {/*                        <IconMessage size={18}*/}
            {/*                                     onClick={() => setFlipped(false)}*/}
            {/*                                     className={classNames(classes.comment)}*/}
            {/*                                     stroke={1.5}/>*/}
            {/*                    </ActionIcon>*/}
            {/*                </Tooltip>*/}
            {/*                {setLike ? <ActionIcon variant="default" radius="md" size={36}>*/}
            {/*                    <Text className={classes.likeCountText}>{task.likers_count}</Text>*/}
            {/*                    <IconHeart size={18}*/}
            {/*                               onClick={() => setLike(task)}*/}
            {/*                               className={classNames(classes.like, {[classes.likeFilled]: task.has_liked})}*/}
            {/*                               stroke={1.5}/>*/}
            {/*                </ActionIcon> : null}*/}
            {/*                {setFavorite ? <ActionIcon variant="default" radius="md" size={36}*/}
            {/*                                           onClick={() => setFavorite(task)}>*/}
            {/*                    <IconBookmark size={18}*/}
            {/*                                  className={classNames(classes.bookmark, {[classes.bookmarkFilled]: task.has_favorited})}*/}
            {/*                                  stroke={1.5}/>*/}
            {/*                </ActionIcon> : null}*/}
            {/*                <RWebShare*/}
            {/*                    sites={sitesToShare}*/}
            {/*                    disableNative={true}*/}
            {/*                    data={{*/}
            {/*                        text: `Вам задание "${task.title}" от virtual-mistress`,*/}
            {/*                        url: linkToTask,*/}
            {/*                        title: "Поделиться заданием",*/}
            {/*                    }}>*/}
            {/*                    <ActionIcon variant="default" radius="md" size={36}>*/}
            {/*                        <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5}/>*/}
            {/*                    </ActionIcon>*/}
            {/*                </RWebShare>*/}
            {/*            </Group>*/}
            {/*        </Group>*/}
            {/*    </Card.Section>*/}
            {/*</Card>*/}
        </motion.div>
    );
};

export default TaskCard;
