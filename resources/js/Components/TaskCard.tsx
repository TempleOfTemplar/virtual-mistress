import React, {FC, useRef, useState} from 'react';
import {Task} from "@/Models/Task";
import {IconBookmark, IconHeart, IconMessage, IconPencil, IconShare} from '@tabler/icons';
import {
    ActionIcon,
    Avatar,
    Badge,
    Button,
    Card,
    Center,
    Col,
    createStyles,
    Divider,
    Grid,
    Group,
    ScrollArea,
    Text,
    Tooltip
} from '@mantine/core';
import {Toy} from "@/Models/Toy";
import {Tag} from "@/Models/Tag";
import classNames from "classnames";
import {useSanctum} from "react-sanctum";
import "./TaskCard.css";
import {spring} from "react-flip-toolkit";
import {RWebShare} from "react-web-share";
import {motion, useAnimationControls, useInView, useMotionValue, useTransform} from "framer-motion";
import CommentListItem from "@/Components/CommentListItem";
import {Link} from "@tanstack/react-location";

const onAppear = (el: any, i: any) => {
    spring({
        config: {overshootClamping: true},
        values: {
            scale: [0.25, 1],
            opacity: [0, 1]
        },
        onUpdate: ({opacity, scale}) => {
            el.style.opacity = opacity;
            el.style.transform = `scale(${scale})`;
        },
        delay: i * 50,
        onComplete: () => {
            // add callback logic here if necessary
        }
    });
};

const onExit = (el: any, i: any, removeElement: any) => {
    spring({
        config: {overshootClamping: true},
        values: {
            scale: [1, 0],
            opacity: [1, 0]
        },
        onUpdate: ({opacity, scale}) => {
            el.style.opacity = opacity;
            el.style.transform = `scale(${scale})`;
        },
        delay: i * 5000,
        onComplete: removeElement
    });
};

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        willChange: "opacity, transform",
    },
    flipContainer: {
        position: "relative",
        width: '100%',
        transformStyle: 'preserve-3d',
        height: '485px'
    },
    faceFront: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden'
    },
    faceBack: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-end'
    },
    commentsWrapper: {
        overflow: "hidden"
    },
    comments: {
        height: '100%',
        maxHeight: '100%'
    },
    tagsSection: {
        height: 52
    },
    titleAndExcerptSection: {
        display: 'flex',
        flexDirection: 'column',
        height: 190
    },
    toysSection: {
        height: 52
    },
    section: {
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`
    },

    like: {
        color: theme.colors.red[6],
    },

    likeFilled: {
        fill: theme.colors.red[6],
    },
    likeCountText: {
        verticalAlign: 'center',
        lineHeight: '18px',
        marginTop: '-2px',
    },
    bookmark: {
        color: theme.colors.yellow[6]
    },
    bookmarkFilled: {
        fill: theme.colors.yellow[6],
    },
    comment: {},

    editButton: {},
    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
    footer: {
        flexShrink: 0,
        padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },
}));

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
    const {classes, theme} = useStyles();
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
    const template = ({rotateY}) => {
        return `rotateY(${rotateY}) `;
    };
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
        <motion.div className={classes.flipContainer} transition={{duration: 0.6}}
                    animate={{
                        rotateY: flipped ? 180 : 0
                    }}
                    layoutId={`card-${task.id}`}
                    ref={ref}>
            <Card withBorder radius="md" p="md" className={classNames(classes.card, classes.faceFront)}>
                <Card.Section className={classes.titleAndExcerptSection} py={4} px='xs' mt={0} mb={0}>
                    <Text size="lg" weight={500}>
                        {task.title}
                    </Text>
                    {/* TODO task.category <Badge size="sm">{task.category}</Badge>*/}
                    <ScrollArea style={{width: '100%', height: '100%'}} offsetScrollbars={true}>
                        <Text size="sm" mt={0}>
                            {task.excerpt}
                        </Text>
                    </ScrollArea>
                </Card.Section>
                <Card.Section py={4} px='xs' mt={0} mb={0}>
                    <Divider my={0} label="Теги" labelPosition="center"/>
                    {task.tags?.length ?
                        <ScrollArea style={{width: '100%'}}>
                            <Group spacing={4} mt={0} className={classes.tagsSection}>
                                {task.tags.map((tag: Tag) => (
                                    <Badge
                                        size='md'
                                        variant='outline'
                                        color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
                                        key={tag?.tag_id}
                                    >
                                        {tag?.name}
                                    </Badge>
                                ))}
                            </Group>
                        </ScrollArea>
                        :
                        <Center style={{width: '100%'}} className={classes.tagsSection}><Text color="dimmed">У
                            этого
                            задания нет
                            тегов</Text></Center>}
                </Card.Section>


                <Card.Section py={4} px='xs' mt={0} mb={0}>
                    <Divider my={0} label="Инвентарь" labelPosition="center"/>
                    {task.toys?.length ?
                        <>
                            <ScrollArea style={{width: '100%', height: 50}}>
                                <Grid m={0} p={0}>
                                    {task.toys.map((toy: Toy) => (
                                        // <Image
                                        //     width={50}
                                        //     radius="md"
                                        //     src={toy.image.thumbnail_url}
                                        //     alt={toy.title}
                                        //     caption={toy.title}
                                        // />
                                        <Col span="content" key={toy.id} m={0} p={0}>
                                            <Badge
                                                size='md'
                                                variant='filled'
                                                color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}

                                            >
                                                {toy.title}
                                            </Badge>
                                        </Col>
                                    ))}
                                </Grid>
                            </ScrollArea>
                        </>
                        :
                        <Center style={{width: '100%', height: 50}}><Text mt="md" className={classes.label}
                                                                          color="dimmed">
                            Инвентарь не требуется
                        </Text></Center>}
                </Card.Section>


                {task.author ? <Group mt="lg" position="apart">
                    <Group>
                        <Avatar src={task.author.avatar} radius="sm"/>
                        <Text weight={500}>{task.author.name}</Text>
                    </Group>
                    {user && task.author.id === user.id ? <ActionIcon className={classes.editButton}
                                                                      component={Link}
                                                                      to={`/tasks/edit/${task.id}`}
                                                                      variant="default"
                                                                      radius="md"
                                                                      size={36}
                                                                      onClick={() => {
                                                                      }}>
                        <IconPencil size={18} stroke={1.5}/>
                    </ActionIcon> : null}
                </Group> : null}
                <Group mt="xs">
                </Group>

                <Card.Section className={classes.footer}>
                    <Group position="apart">
                        <Button component={Link} radius="md" to={`/tasks/${task.id}`}>
                            Читать
                        </Button>
                        <Group spacing={2}>
                            <Tooltip label="Посмотреть комментарии">
                                <ActionIcon variant="default" radius="md" size={36}>
                                    <IconMessage size={18}
                                                 onClick={() => setFlipped(true)}
                                                 className={classNames(classes.comment)}
                                                 stroke={1.5}/>
                                </ActionIcon>
                            </Tooltip>
                            {setLike ? <ActionIcon variant="default" radius="md" size={36}>
                                <Text className={classes.likeCountText}>{task.likers_count}</Text>
                                <IconHeart size={18}
                                           onClick={() => setLike(task)}
                                           className={classNames(classes.like, {[classes.likeFilled]: task.has_liked})}
                                           stroke={1.5}/>
                            </ActionIcon> : null}
                            {setFavorite ? <ActionIcon variant="default" radius="md" size={36}
                                                       onClick={() => setFavorite(task)}>
                                <IconBookmark size={18}
                                              className={classNames(classes.bookmark, {[classes.bookmarkFilled]: task.has_favorited})}
                                              stroke={1.5}/>
                            </ActionIcon> : null}
                            <RWebShare
                                sites={sitesToShare}
                                disableNative={true}
                                data={{
                                    text: `Вам задание "${task.title}" от virtual-mistress`,
                                    url: linkToTask,
                                    title: "Поделиться заданием",
                                }}>
                                <ActionIcon variant="default" radius="md" size={36}>
                                    <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5}/>
                                </ActionIcon>
                            </RWebShare>
                        </Group>
                    </Group>
                </Card.Section>
            </Card>
            <Card withBorder radius="md" p="md" className={classNames(classes.card, classes.faceBack)}>
                <Card.Section className={classes.commentsWrapper}>
                    <ScrollArea className={classes.comments}>
                        {task.comments?.map((comment) => <CommentListItem key={comment.id} comment={comment}/>)}
                    </ScrollArea>
                </Card.Section>
                <Card.Section className={classes.footer}>
                    <Group position="apart">
                        <Button component={Link} radius="md" to={`/tasks/${task.id}`}>
                            Читать
                        </Button>
                        <Group spacing={2}>
                            <Tooltip label="Посмотреть комментарии">
                                <ActionIcon variant="default" radius="md" size={36}>
                                    <IconMessage size={18}
                                                 onClick={() => setFlipped(false)}
                                                 className={classNames(classes.comment)}
                                                 stroke={1.5}/>
                                </ActionIcon>
                            </Tooltip>
                            {setLike ? <ActionIcon variant="default" radius="md" size={36}>
                                <Text className={classes.likeCountText}>{task.likers_count}</Text>
                                <IconHeart size={18}
                                           onClick={() => setLike(task)}
                                           className={classNames(classes.like, {[classes.likeFilled]: task.has_liked})}
                                           stroke={1.5}/>
                            </ActionIcon> : null}
                            {setFavorite ? <ActionIcon variant="default" radius="md" size={36}
                                                       onClick={() => setFavorite(task)}>
                                <IconBookmark size={18}
                                              className={classNames(classes.bookmark, {[classes.bookmarkFilled]: task.has_favorited})}
                                              stroke={1.5}/>
                            </ActionIcon> : null}
                            <RWebShare
                                sites={sitesToShare}
                                disableNative={true}
                                data={{
                                    text: `Вам задание "${task.title}" от virtual-mistress`,
                                    url: linkToTask,
                                    title: "Поделиться заданием",
                                }}>
                                <ActionIcon variant="default" radius="md" size={36}>
                                    <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5}/>
                                </ActionIcon>
                            </RWebShare>
                        </Group>
                    </Group>
                </Card.Section>
            </Card>
        </motion.div>
    );
};

export default TaskCard;
