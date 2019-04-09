<template>
    <div class="app-container">
        <h1>{{problemList.title}}</h1>
        <el-row :gutter="20">
            <el-col :span="15">
                <Problems :problemListId="problemListId" />
            </el-col>
            <el-col :span="9">
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
            classrooms: 'coach_classrooms',
            problemList: 'problemList',
        }),
    },

    async created() {
        await this.$store.dispatch('Coach/fetchClassrooms', this.user._id)
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
