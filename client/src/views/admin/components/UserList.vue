<template>
    <div>
        <el-card class="box-card">
            <el-table :data="users" border>
                <el-table-column prop="displayIndex" label="#" width="40" />
                <el-table-column label="UserName" :sortable="true">
                    <template slot-scope="scope">
                        <template>
                            {{scope.row.email}}
                        </template>
                    </template>
                </el-table-column>
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
