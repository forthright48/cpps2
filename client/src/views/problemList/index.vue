<template>
    <div class="app-container">
        <h1>{{problemList.title}}</h1>
        <el-row :gutter="20">
            <el-col :span="isOwnClassroom ? 14 : 24">
                <Problems :problemListId="problemListId" />
            </el-col>
            <el-col v-if="isOwnClassroom" :span="10">
                <SharedWith :problemListId="problemListId" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Problems from './components/Problems'
import SharedWith from './components/SharedWith'
import { addProblemListToClassroom } from '@/store/actions'
import { mapGetters } from 'vuex'

export default {
    components: {
        Problems,
        SharedWith,
    },

    props: ['problemListId'],

    data() {
        return {
            loading: false,
            targetClassroom: '',
        }
    },

    computed: {
        ...mapGetters({
            user: 'user',
            problemList: 'problemList',
        }),
        isOwnClassroom() {
            return this.user._id === this.problemList.createdBy
        },
    },

    async created() {
        await this.$store.dispatch('Coach/fetchClassrooms')
    },

    methods: {
        async addToClassroom() {
            this.loading = true
            try {
                await this.$store.dispatch(addProblemListToClassroom, this.targetClassroom)
            } finally {
                this.loading = false
            }
        },
    },
}
</script>
