<!-- prettier-ignore -->
<template>
    <div id="list">
        <div class="md:float-left md:w-2/3">
            <div class="layout-group px-3 text-sm text-left m-auto mb-8" v-for="list in info" :key="list.id">
                <img class="rounded-lg m-auto mb-4" src="https://via.placeholder.com/2048X1500/FFFF00/000000/ccc.png" />
                <div class="px-7 w-11/12 m-auto sm:text-lg md:text-xl lg:text-2xl sm:mb-20 md:mb-30 lg:mb-35 ">
                    <span>
                        <b>
                            <router-link :to="{ name: 'Page', query: { id: list.id }}">{{ list.title }}</router-link>
                        </b>
                    </span>
                    <br>
                    <b>2021. 04. 26</b>
                    <br>
                    <br>
                    <p>{{ list.body }}</p>
                </div>
            </div>
            <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
                <div slot="no-more"></div>
            </infinite-loading>
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
    import InfiniteLoading from 'vue-infinite-loading';
    import unionWith from 'lodash/unionWith';

    export default {
        data() {
            return {
                info: [],
                page: 1,
                contents: [],
                moreContentsId: [],
            };
        },
        methods: {
            infiniteHandler($state) {
                const options = {
                    params: {
                        _page: this.page,
                        _limit: 5,
                    },
                };
                this.$axios.get('https://jsonplaceholder.typicode.com/posts', options)
                    .then((res) => {
                        setTimeout(() => {
                            if (res.data.length) {
                                this.info = unionWith(this.info, res.data);
                                $state.loaded();
                                this.page += 1;
                                if (this.info.length % 30 == 0) {
                                    $state.complete();
                                }
                            } else {
                                $state.complete();
                            }
                        }, 500);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
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
            this.makeContentRandom();

        },
        components: {
            InfiniteLoading,
        },
        mounted() {
            const contentsId = {
                params: {
                    id: this.moreContentsId,
                },
            };
            this.$axios.get('https://jsonplaceholder.typicode.com/photos', contentsId)
            .then((response) => (this.contents = response.data));
        },
    };
</script>

<style scoped>
    .layout-group {
        max-width: 95%;
    }

    .page-for-margin {
        clear: both;
    }

    @media (max-width: 767px) {
        .page-right-only-pc {
            display: none;
        }
    }
</style>