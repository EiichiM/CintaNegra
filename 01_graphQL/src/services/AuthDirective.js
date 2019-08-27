const { SchemaDirectiveVisitor } = require("graphql-tools");
const { defaultFieldResolver } = require("graphql");

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver}= field;
        field.resolve= async function (... args){
            [, , context]= args;
            if ( context.user){
                return await resolve.apply(this, args);
            }else { throw new Error( "Necesitas Cuenta")}
        }
    }
}

module.exports = AuthDirective