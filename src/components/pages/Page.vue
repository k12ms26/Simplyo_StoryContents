<!-- prettier-ignore -->
<template>
    <div id="list">
        <div class="md:float-left md:w-2/3">
            <div class="layout-group px-3 text-sm text-left m-auto mb-8">
                <img class="rounded-lg m-auto mb-4" src="https://via.placeholder.com/2048X1500/FFFF00/000000/ccc.png" />
                <div class="mb-15 pb-10 text-sm sm:text-base lg:text-xl">
                    <div v-for="list in info" :key="list.id">
                        <div class="text-left px-3 mb-2">
                            <span>
                                <b>
                                    {{ list.title }}
                                </b>
                            </span>
                            <br>
                            <b>2021. 04. 26</b>
                        </div>
                        <p class="text-left px-3 mb-10">{{ list.body }}</p>
                    </div>
                </div>
                <div class="px-2 mb-16 page-edit-box">
                    <img class="rounded-full w-1/4 sm:w-1/5 float-left"
                        src="https://via.placeholder.com/100/f5deab/ccc.png">
                    <div class="text-left text-sm lg:text-lg w-3/4 inline-block page-edit-editor">
                        <b>Written by Jina Park</b>
                        <p>특히 봄날의 곰에 관심이 많은 심플리오 에디터입니다</p>
                    </div>
                </div>
            </div>
            <div class="page-for-margin">
                <br>
                <br>
            </div>
            <div class="layout-group px-3 text-sm text-left m-auto mb-8">
                <p class="font-semibold text-left pl-3 mb-1 sm:mt-5 sm:text-xl lg:text-2xl page-bottom-title">More
                    Stories</p>
                <div v-for="n in moreStories" :key="n.id">
                    <div class="w-1/2 float-left px-1 pb-5">
                        <router-link :key="$route.path" :to="{name: 'Page', query: { id: n.id }}">
                            <img class="rounded-md" src="https://via.placeholder.com/1000X750/555/ccc.png">
                            <p
                                class="text-sm md:text-base xl:text-xl 2xl:text-lg xl:leading-none px-2 py-1 overflow-ellipsis overflow-hidden whitespace-normal h-12 2xl:h-16 text-left break-words page-morestories-text">
                                {{ n.title }}</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-right-only-pc w-1/3 inline-block px-2 2xl:pl-8">
            <div class="fixed pr-5 w-1/4">
                <b class="lg:text-lg xl:text-lg text-left leading-9">관련 콘텐츠</b>
                <div class="pt-2 px-2 h-13" v-for="content in contents" :key="content.id">
                    <hr class="mb-2">
                    <img class="float-left w-1/5 lg:w-1/6" :src="content.thumbnailUrl">
                    <div
                        class="text-left sm:text-xs lg:text-sm xl:text-base w-3/4 lg:w-4/5 xl:w-5/6 inline-block px-2 mb-1">
                        <!-- <p class="text-left text-xs xl:text-sm">{{ content.id }}</p> -->
                        <span>
                            {{ content.title }}
                        </span>
                        <br>
                    </div>
                    <div class="page-for-margin"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Page',
        data() {
            return {
                id: this.$route.query.id,
                info: [],
                moreStories: [],
                moreStoriesId: [],
                contents: [],
                moreContentsId: [],
            };
        },
        watch: {
            '$route.query.id'() {
                location.reload();
            },
        },
        methods: {
            makeRandom() {
                let randomNum;
                while (this.moreStoriesId.length < 4) {
                    randomNum = Math.floor(Math.random() * 30) + 1;
                    if (randomNum == this.id || this.moreStoriesId.includes(randomNum)) continue;
                    else this.moreStoriesId.push(randomNum);
                }
            },
            makeContentRandom() {
                let randomNum;
                while (this.moreContentsId.length < 6) {
                    randomNum = Math.floor(Math.random() * 50) + 1;
                    if (randomNum == this.id || this.moreContentsId.includes(randomNum)) continue;
                    else this.moreContentsId.push(randomNum);
                }
            },
        },
        created() {
            this.makeRandom();
            this.makeContentRandom();
        },
        mounted() {
            const queryId = {
                params: {
                    id: this.id,
                },
            };
            const storiesId = {
                params: {
                    id: this.moreStoriesId,
                },
            };
            const contentsId = {
                params: {
                    id: this.moreContentsId,
                },
            };
            this.$axios.get('https://jsonplaceholder.typicode.com/posts', queryId)
                .then((response) => this.info = response.data);
            this.$axios.get('https://jsonplaceholder.typicode.com/posts', storiesId)
                .then((response) => (this.moreStories = response.data));
            this.$axios.get('https://jsonplaceholder.typicode.com/photos', contentsId)
                .then((response) => (this.contents = response.data));
            // this.$axios.get('/v1/story/category')
            //     .then((response) => {
            //         console.log(response.data)
            //     })
            //     .catch((err) => {
            //         console.error(err);
            //     });
        },
    };
</script>

<style scoped>
    .layout-group {
        max-width: 95%;
    }

    .page-edit-box {
        margin-top: 2%;
    }

    @media (max-width: 319px) {
        .page-edit-editor {
            font-size: 10px;
            padding-top: 1.4%;
            padding-left: 3%;
        }
    }

    @media (min-width: 320px) {
        .page-edit-editor {
            padding-top: 2.4%;
            padding-left: 3%;
        }
    }

    @media (max-width: 400px) {
        .page-for-margin {
            display: none;
        }
    }

    @media (min-width: 401px) {
        .page-for-margin {
            clear: both;
        }
    }

    .page-morestories-text {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    @media (max-width: 767px) {
        .page-right-only-pc {
            display: none;
        }
    }
</style>