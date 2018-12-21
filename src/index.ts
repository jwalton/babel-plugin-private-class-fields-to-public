import * as traverse from '@babel/traverse';
import * as t from '@babel/types';

export default function(babel: any) {
    const t = babel.types;
    return {
        name: 'private-class-fields-to-public',

        manipulateOptions(opts: any, parserOpts: any) {
            if (
                parserOpts.plugins.some(
                    (p: any) => (Array.isArray(p) ? p[0] : p) === 'classPrivateProperties'
                )
            ) {
                return;
            }

            parserOpts.plugins.push('classPrivateProperties');
        },

        visitor: {
            ClassPrivateProperty(path: traverse.NodePath<t.ClassPrivateProperty>) {
                const identifierName = path.node.key.id.name;

                path.insertAfter(
                    t.classMethod(
                        'get', // kind
                        t.identifier('_' + identifierName), // key
                        [], // params
                        t.blockStatement([
                            t.returnStatement(
                                t.memberExpression(
                                    t.thisExpression(),
                                    t.privateName(t.identifier(identifierName))
                                )
                            ),
                        ]) // body
                    )
                );

                path.insertAfter(
                    t.classMethod(
                        'set', // kind
                        t.identifier('_' + identifierName), // key
                        [t.identifier(identifierName)], // params
                        t.blockStatement([
                            t.expressionStatement(
                                t.assignmentExpression(
                                    '=',
                                    t.memberExpression(
                                        t.thisExpression(),
                                        t.privateName(t.identifier(identifierName))
                                    ),
                                    t.identifier(identifierName)
                                )
                            ),
                        ]) // body
                    )
                );
            },
        },
    };
}
