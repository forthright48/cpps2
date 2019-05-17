<template>
    <div>
        <el-card class="box-card">
            <el-table :data="users" border height="450">
                <el-table-column type="index" label="#" width="40"/>
                <el-table-column label="Username" property="username" :sortable="true"/>
                <el-table-column label="Email" property="email" :sortable="true"/>
                <el-table-column label="Actions">
                    <template slot-scope="scope">
                        <el-button
                            @click="(!scope.row.roles.includes('admin') 
                                ? addRole
                                : removeRole) (scope.row, 'admin')"
                            :type="!scope.row.roles.includes('admin') ? 'success' : 'danger'"
                            size="small"
                            :disabled="scope.row.username === user.username"
                        >
                            {{ scope.row.roles.includes('admin') ? 'Remove' : 'Add' }} Admin
                        </el-button>
                        <el-button
                            @click="(!scope.row.roles.includes('coach') 
                                ? addRole
                                : removeRole) (scope.row, 'coach')"
                            :type="!scope.row.roles.includes('coach') ? 'success' : 'danger'"
                            size="small"
                        >
                            {{ scope.row.roles.includes('coach') ? 'Remove' : 'Add' }} Coach
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { AddRole, RemoveRole } from '@/store/actions'

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
            'user',
            'users',
        ]),
    },

    async created() {},

    methods: {
        async addRole(user, role) {
            try {
                if (user.roles.includes(role)) return
                await this.$store.dispatch(AddRole, {
                    role,
                    username: user.username,
                })
                user.roles.push(role)
            } catch (err) {
                console.log(err)
            }
        },
        async removeRole(user, role) {
            try {
                if (!user.roles.includes(role)) return
                await this.$store.dispatch(RemoveRole, {
                    role,
                    username: user.username,
                })
                user.roles = user.roles.filter(r => r !== role)
            } catch (err) {
                console.log(err)
            }
        },
    },
}
</script>
