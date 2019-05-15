<template>
    <div>
        <el-card class="box-card">
            <el-table :data="users" border height="450">
                <el-table-column type="index" label="#" width="40"/>
                <el-table-column label="Username" property="username" :sortable="true"/>>
                <el-table-column label="Email" property="email" :sortable="true"/>>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    components: {},

    props: [],

    data() {
        return {
            loading: false,
        }
    },

    computed: {
        ...mapGetters([
            'users',
        ]),
    },

    async created() {},

    methods: {},
}
</script>
