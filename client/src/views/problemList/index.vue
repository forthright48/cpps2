<template>
    <div class="app-container">
        <h1>{{problemList.title}}</h1>
        <el-row>
            <el-col :span="14">
                <Problems :problemListId="problemListId" />
            </el-col>
            <el-col :span="1">
                &nbsp;
            </el-col>
            <el-col :span="8">
                <SharedWith :problemListId="problemListId" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Problems from './components/Problems'
import SharedWith from './components/SharedWith'
import { fetchClassrooms, addProblemListToClassroom } from '@/store/actions'
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
        ...mapGetters([
            'classrooms',
            'problemList',
        ]),
    },

    async created() {
        await this.$store.dispatch(fetchClassrooms)
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
