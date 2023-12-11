const {GraphQLScalarType,Kind} =require( 'graphql')
const Date={
    Date:new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        serialize(value){
            date = new Date(value);
            return date.toISOString();
        },
        parseValue(value){
            return new Date(value);
        },
        parseLiteral(ast){
            if(ast.kind===Kind.INT){
                return parseInt(ast.value,10)
            }
            return null
        }
        

    })
}
module.exports={Date};