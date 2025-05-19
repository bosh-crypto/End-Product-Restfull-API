const { useCallback } = require("react");
const pool = require("../config/database");


module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into registration(firstname , lastname , gender , email , password , number)
                        values(?,?,?,?,?,?)`,
            
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error , result , feilds) => {
                if (error){
                    return callBack(error);
                }
                return callBack(null,result)
            }

        );
    },
    getUsers: callBack => {
        pool.query(
            `select   firstname , lastname , gender , email , number, id  from registration`,
            [],
            (error , result , feilds) => {
                if (error){
                    return callBack(error)
                }
                return callBack(null,result);
            }
        )
    },
    getUsersByUserId: ( id ,callBack) => {
        console.log("???????????/",id)
        pool.query(
            `select firstname ,lastname ,gender ,email , number , id  from registration where id =? `,
            [id],
            (error , result , feilds) => {
                if (error){
                    return callBack(error)
                }
                return callBack(null , result);
            }
        )
    },
    UpdateUser: (data, callBack) => {
        pool.query(
            `update registration set firstname=? , lastname=? , gender=? , email=? , password=? , number=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error , result , feilds) => {
                if (error){
                    return callBack(error);
                }
                return callBack(null,result)
            }

        );
    },
    deleteUser: ( data ,callBack) => {
        pool.query(
            `delete from registration where id = ?`,
            [data.id],
            (error , result , feilds) => {
                if (error){
                    return callBack(error)
                }
                return callBack(null,result[0]);
            }
        )
    },

    getUsersByEmail: (email, callBack) => {
    pool.query(
        `select * from registration where email = ?`,
        [email],
        (error, result) => { // Removed 'feilds' as it's often misspelled and less commonly used
            if (error) {
                return callBack(error);
            }
            return callBack(null, result[0]);
        }
    );
},
    

}