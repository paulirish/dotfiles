import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace optimization_guide. */
export namespace optimization_guide {

    /** Namespace proto. */
    namespace proto {

        /**
         * Properties of a FloatArray.
         * @deprecated Use optimization_guide.proto.FloatArray.$Properties instead.
         */
        interface IFloatArray extends optimization_guide.proto.FloatArray.$Properties {
        }

        /** Represents a FloatArray. */
        class FloatArray {

            /**
             * Constructs a new FloatArray.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.FloatArray.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** FloatArray values. */
            values: number[];

            /**
             * Creates a new FloatArray instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FloatArray instance
             */
            static create(properties: optimization_guide.proto.FloatArray.$Shape): optimization_guide.proto.FloatArray & optimization_guide.proto.FloatArray.$Shape;
            static create(properties?: optimization_guide.proto.FloatArray.$Properties): optimization_guide.proto.FloatArray;

            /**
             * Encodes the specified FloatArray message. Does not implicitly {@link optimization_guide.proto.FloatArray.verify|verify} messages.
             * @param message FloatArray message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.FloatArray.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FloatArray message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.FloatArray & optimization_guide.proto.FloatArray.$Shape} FloatArray
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.FloatArray & optimization_guide.proto.FloatArray.$Shape;

            /**
             * Creates a FloatArray message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FloatArray
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.FloatArray;

            /**
             * Creates a plain object from a FloatArray message. Also converts values to other types if specified.
             * @param message FloatArray
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.FloatArray, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FloatArray to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace FloatArray {

            /** Properties of a FloatArray. */
            interface $Properties {

                /** FloatArray values */
                values?: (number[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a FloatArray. */
            type $Shape = optimization_guide.proto.FloatArray.$Properties;
        }

        /**
         * Properties of an Embedding.
         * @deprecated Use optimization_guide.proto.Embedding.$Properties instead.
         */
        interface IEmbedding extends optimization_guide.proto.Embedding.$Properties {
        }

        /** Represents an Embedding. */
        class Embedding {

            /**
             * Constructs a new Embedding.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.Embedding.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Embedding floats. */
            floats?: (optimization_guide.proto.FloatArray.$Properties|null);

            /**
             * Creates a new Embedding instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Embedding instance
             */
            static create(properties: optimization_guide.proto.Embedding.$Shape): optimization_guide.proto.Embedding & optimization_guide.proto.Embedding.$Shape;
            static create(properties?: optimization_guide.proto.Embedding.$Properties): optimization_guide.proto.Embedding;

            /**
             * Encodes the specified Embedding message. Does not implicitly {@link optimization_guide.proto.Embedding.verify|verify} messages.
             * @param message Embedding message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.Embedding.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Embedding message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.Embedding & optimization_guide.proto.Embedding.$Shape} Embedding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.Embedding & optimization_guide.proto.Embedding.$Shape;

            /**
             * Creates an Embedding message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Embedding
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.Embedding;

            /**
             * Creates a plain object from an Embedding message. Also converts values to other types if specified.
             * @param message Embedding
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.Embedding, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Embedding to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace Embedding {

            /** Properties of an Embedding. */
            interface $Properties {

                /** Embedding floats */
                floats?: (optimization_guide.proto.FloatArray.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an Embedding. */
            type $Shape = optimization_guide.proto.Embedding.$Properties;
        }

        /**
         * Properties of a AXTreeUpdate.
         * @deprecated Use optimization_guide.proto.AXTreeUpdate.$Properties instead.
         */
        interface IAXTreeUpdate extends optimization_guide.proto.AXTreeUpdate.$Properties {
        }

        /** Represents a AXTreeUpdate. */
        class AXTreeUpdate {

            /**
             * Constructs a new AXTreeUpdate.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AXTreeUpdate.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** AXTreeUpdate treeData. */
            treeData?: (optimization_guide.proto.AXTreeData.$Properties|null);

            /** AXTreeUpdate rootId. */
            rootId: number;

            /** AXTreeUpdate nodes. */
            nodes: optimization_guide.proto.AXNodeData.$Properties[];

            /**
             * Creates a new AXTreeUpdate instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AXTreeUpdate instance
             */
            static create(properties: optimization_guide.proto.AXTreeUpdate.$Shape): optimization_guide.proto.AXTreeUpdate & optimization_guide.proto.AXTreeUpdate.$Shape;
            static create(properties?: optimization_guide.proto.AXTreeUpdate.$Properties): optimization_guide.proto.AXTreeUpdate;

            /**
             * Encodes the specified AXTreeUpdate message. Does not implicitly {@link optimization_guide.proto.AXTreeUpdate.verify|verify} messages.
             * @param message AXTreeUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AXTreeUpdate.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a AXTreeUpdate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AXTreeUpdate & optimization_guide.proto.AXTreeUpdate.$Shape} AXTreeUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AXTreeUpdate & optimization_guide.proto.AXTreeUpdate.$Shape;

            /**
             * Creates a AXTreeUpdate message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AXTreeUpdate
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AXTreeUpdate;

            /**
             * Creates a plain object from a AXTreeUpdate message. Also converts values to other types if specified.
             * @param message AXTreeUpdate
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AXTreeUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AXTreeUpdate to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AXTreeUpdate {

            /** Properties of a AXTreeUpdate. */
            interface $Properties {

                /** AXTreeUpdate treeData */
                treeData?: (optimization_guide.proto.AXTreeData.$Properties|null);

                /** AXTreeUpdate rootId */
                rootId?: (number|null);

                /** AXTreeUpdate nodes */
                nodes?: (optimization_guide.proto.AXNodeData.$Properties[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a AXTreeUpdate. */
            type $Shape = {
              treeData?: optimization_guide.proto.AXTreeData.$Shape|null;
              rootId?: number|null;
              nodes?: optimization_guide.proto.AXNodeData.$Shape[]|null;
              $unknowns?: Uint8Array[];
            };
        }

        /**
         * Properties of a AXTreeData.
         * @deprecated Use optimization_guide.proto.AXTreeData.$Properties instead.
         */
        interface IAXTreeData extends optimization_guide.proto.AXTreeData.$Properties {
        }

        /** Represents a AXTreeData. */
        class AXTreeData {

            /**
             * Constructs a new AXTreeData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AXTreeData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** AXTreeData doctype. */
            doctype: string;

            /** AXTreeData loaded. */
            loaded: boolean;

            /** AXTreeData loadingProgress. */
            loadingProgress: number;

            /** AXTreeData mimetype. */
            mimetype: string;

            /** AXTreeData title. */
            title: string;

            /** AXTreeData focusId. */
            focusId: number;

            /** AXTreeData selIsBackward. */
            selIsBackward: boolean;

            /** AXTreeData selAnchorObjectId. */
            selAnchorObjectId: number;

            /** AXTreeData selAnchorOffset. */
            selAnchorOffset: number;

            /** AXTreeData selAnchorAffinity. */
            selAnchorAffinity: optimization_guide.proto.AXTextAffinity;

            /** AXTreeData selFocusObjectId. */
            selFocusObjectId: number;

            /** AXTreeData selFocusOffset. */
            selFocusOffset: number;

            /** AXTreeData selFocusAffinity. */
            selFocusAffinity: optimization_guide.proto.AXTextAffinity;

            /** AXTreeData rootScrollerId. */
            rootScrollerId: number;

            /** AXTreeData metadata. */
            metadata: string[];

            /**
             * Creates a new AXTreeData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AXTreeData instance
             */
            static create(properties: optimization_guide.proto.AXTreeData.$Shape): optimization_guide.proto.AXTreeData & optimization_guide.proto.AXTreeData.$Shape;
            static create(properties?: optimization_guide.proto.AXTreeData.$Properties): optimization_guide.proto.AXTreeData;

            /**
             * Encodes the specified AXTreeData message. Does not implicitly {@link optimization_guide.proto.AXTreeData.verify|verify} messages.
             * @param message AXTreeData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AXTreeData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a AXTreeData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AXTreeData & optimization_guide.proto.AXTreeData.$Shape} AXTreeData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AXTreeData & optimization_guide.proto.AXTreeData.$Shape;

            /**
             * Creates a AXTreeData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AXTreeData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AXTreeData;

            /**
             * Creates a plain object from a AXTreeData message. Also converts values to other types if specified.
             * @param message AXTreeData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AXTreeData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AXTreeData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AXTreeData {

            /** Properties of a AXTreeData. */
            interface $Properties {

                /** AXTreeData doctype */
                doctype?: (string|null);

                /** AXTreeData loaded */
                loaded?: (boolean|null);

                /** AXTreeData loadingProgress */
                loadingProgress?: (number|null);

                /** AXTreeData mimetype */
                mimetype?: (string|null);

                /** AXTreeData title */
                title?: (string|null);

                /** AXTreeData focusId */
                focusId?: (number|null);

                /** AXTreeData selIsBackward */
                selIsBackward?: (boolean|null);

                /** AXTreeData selAnchorObjectId */
                selAnchorObjectId?: (number|null);

                /** AXTreeData selAnchorOffset */
                selAnchorOffset?: (number|null);

                /** AXTreeData selAnchorAffinity */
                selAnchorAffinity?: (optimization_guide.proto.AXTextAffinity|null);

                /** AXTreeData selFocusObjectId */
                selFocusObjectId?: (number|null);

                /** AXTreeData selFocusOffset */
                selFocusOffset?: (number|null);

                /** AXTreeData selFocusAffinity */
                selFocusAffinity?: (optimization_guide.proto.AXTextAffinity|null);

                /** AXTreeData rootScrollerId */
                rootScrollerId?: (number|null);

                /** AXTreeData metadata */
                metadata?: (string[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a AXTreeData. */
            type $Shape = optimization_guide.proto.AXTreeData.$Properties;
        }

        /**
         * Properties of a AXNodeData.
         * @deprecated Use optimization_guide.proto.AXNodeData.$Properties instead.
         */
        interface IAXNodeData extends optimization_guide.proto.AXNodeData.$Properties {
        }

        /** Represents a AXNodeData. */
        class AXNodeData {

            /**
             * Constructs a new AXNodeData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AXNodeData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** AXNodeData id. */
            id: number;

            /** AXNodeData role. */
            role: optimization_guide.proto.AXRole;

            /** AXNodeData state. */
            state: number;

            /** AXNodeData actions. */
            actions: (number|Long);

            /** AXNodeData attributes. */
            attributes: optimization_guide.proto.AXAttribute.$Properties[];

            /** AXNodeData childIds. */
            childIds: number[];

            /** AXNodeData relativeBounds. */
            relativeBounds?: (optimization_guide.proto.AXRelativeBounds.$Properties|null);

            /**
             * Creates a new AXNodeData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AXNodeData instance
             */
            static create(properties: optimization_guide.proto.AXNodeData.$Shape): optimization_guide.proto.AXNodeData & optimization_guide.proto.AXNodeData.$Shape;
            static create(properties?: optimization_guide.proto.AXNodeData.$Properties): optimization_guide.proto.AXNodeData;

            /**
             * Encodes the specified AXNodeData message. Does not implicitly {@link optimization_guide.proto.AXNodeData.verify|verify} messages.
             * @param message AXNodeData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AXNodeData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a AXNodeData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AXNodeData & optimization_guide.proto.AXNodeData.$Shape} AXNodeData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AXNodeData & optimization_guide.proto.AXNodeData.$Shape;

            /**
             * Creates a AXNodeData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AXNodeData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AXNodeData;

            /**
             * Creates a plain object from a AXNodeData message. Also converts values to other types if specified.
             * @param message AXNodeData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AXNodeData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AXNodeData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AXNodeData {

            /** Properties of a AXNodeData. */
            interface $Properties {

                /** AXNodeData id */
                id?: (number|null);

                /** AXNodeData role */
                role?: (optimization_guide.proto.AXRole|null);

                /** AXNodeData state */
                state?: (number|null);

                /** AXNodeData actions */
                actions?: (number|Long|null);

                /** AXNodeData attributes */
                attributes?: (optimization_guide.proto.AXAttribute.$Properties[]|null);

                /** AXNodeData childIds */
                childIds?: (number[]|null);

                /** AXNodeData relativeBounds */
                relativeBounds?: (optimization_guide.proto.AXRelativeBounds.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a AXNodeData. */
            type $Shape = {
              id?: number|null;
              role?: optimization_guide.proto.AXRole|null;
              state?: number|null;
              actions?: number|Long|null;
              attributes?: optimization_guide.proto.AXAttribute.$Shape[]|null;
              childIds?: number[]|null;
              relativeBounds?: optimization_guide.proto.AXRelativeBounds.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        /**
         * Properties of a AXAttribute.
         * @deprecated Use optimization_guide.proto.AXAttribute.$Properties instead.
         */
        interface IAXAttribute extends optimization_guide.proto.AXAttribute.$Properties {
        }

        /** Represents a AXAttribute. */
        class AXAttribute {

            /**
             * Constructs a new AXAttribute.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AXAttribute.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** AXAttribute stringType. */
            stringType?: (optimization_guide.proto.AXStringAttribute|null);

            /** AXAttribute intType. */
            intType?: (optimization_guide.proto.AXIntAttribute|null);

            /** AXAttribute floatType. */
            floatType?: (optimization_guide.proto.AXFloatAttribute|null);

            /** AXAttribute boolType. */
            boolType?: (optimization_guide.proto.AXBoolAttribute|null);

            /** AXAttribute intlistType. */
            intlistType?: (optimization_guide.proto.AXIntListAttribute|null);

            /** AXAttribute stringlistType. */
            stringlistType?: (optimization_guide.proto.AXStringListAttribute|null);

            /** AXAttribute htmlAttributeName. */
            htmlAttributeName?: (string|null);

            /** AXAttribute stringValue. */
            stringValue?: (string|null);

            /** AXAttribute intValue. */
            intValue?: (number|null);

            /** AXAttribute floatValue. */
            floatValue?: (number|null);

            /** AXAttribute boolValue. */
            boolValue?: (boolean|null);

            /** AXAttribute intListValue. */
            intListValue?: (optimization_guide.proto.AXIntList.$Properties|null);

            /** AXAttribute stringListValue. */
            stringListValue?: (optimization_guide.proto.AXStringList.$Properties|null);

            /** AXAttribute htmlAttributeValue. */
            htmlAttributeValue?: (string|null);

            /** AXAttribute attributeKey. */
            attributeKey?: ("stringType"|"intType"|"floatType"|"boolType"|"intlistType"|"stringlistType"|"htmlAttributeName");

            /** AXAttribute attributeValue. */
            attributeValue?: ("stringValue"|"intValue"|"floatValue"|"boolValue"|"intListValue"|"stringListValue"|"htmlAttributeValue");

            /**
             * Creates a new AXAttribute instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AXAttribute instance
             */
            static create(properties: optimization_guide.proto.AXAttribute.$Shape): optimization_guide.proto.AXAttribute & optimization_guide.proto.AXAttribute.$Shape;
            static create(properties?: optimization_guide.proto.AXAttribute.$Properties): optimization_guide.proto.AXAttribute;

            /**
             * Encodes the specified AXAttribute message. Does not implicitly {@link optimization_guide.proto.AXAttribute.verify|verify} messages.
             * @param message AXAttribute message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AXAttribute.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a AXAttribute message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AXAttribute & optimization_guide.proto.AXAttribute.$Shape} AXAttribute
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AXAttribute & optimization_guide.proto.AXAttribute.$Shape;

            /**
             * Creates a AXAttribute message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AXAttribute
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AXAttribute;

            /**
             * Creates a plain object from a AXAttribute message. Also converts values to other types if specified.
             * @param message AXAttribute
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AXAttribute, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AXAttribute to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AXAttribute {

            /** Properties of a AXAttribute. */
            interface $Properties {

                /** AXAttribute stringType */
                stringType?: (optimization_guide.proto.AXStringAttribute|null);

                /** AXAttribute intType */
                intType?: (optimization_guide.proto.AXIntAttribute|null);

                /** AXAttribute floatType */
                floatType?: (optimization_guide.proto.AXFloatAttribute|null);

                /** AXAttribute boolType */
                boolType?: (optimization_guide.proto.AXBoolAttribute|null);

                /** AXAttribute intlistType */
                intlistType?: (optimization_guide.proto.AXIntListAttribute|null);

                /** AXAttribute stringlistType */
                stringlistType?: (optimization_guide.proto.AXStringListAttribute|null);

                /** AXAttribute htmlAttributeName */
                htmlAttributeName?: (string|null);

                /** AXAttribute stringValue */
                stringValue?: (string|null);

                /** AXAttribute intValue */
                intValue?: (number|null);

                /** AXAttribute floatValue */
                floatValue?: (number|null);

                /** AXAttribute boolValue */
                boolValue?: (boolean|null);

                /** AXAttribute intListValue */
                intListValue?: (optimization_guide.proto.AXIntList.$Properties|null);

                /** AXAttribute stringListValue */
                stringListValue?: (optimization_guide.proto.AXStringList.$Properties|null);

                /** AXAttribute htmlAttributeValue */
                htmlAttributeValue?: (string|null);

                /** AXAttribute attributeKey */
                attributeKey?: ("stringType"|"intType"|"floatType"|"boolType"|"intlistType"|"stringlistType"|"htmlAttributeName");

                /** AXAttribute attributeValue */
                attributeValue?: ("stringValue"|"intValue"|"floatValue"|"boolValue"|"intListValue"|"stringListValue"|"htmlAttributeValue");

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Narrowed shape of a AXAttribute. */
            type $Shape = {
              stringType?: optimization_guide.proto.AXStringAttribute|null;
              intType?: optimization_guide.proto.AXIntAttribute|null;
              floatType?: optimization_guide.proto.AXFloatAttribute|null;
              boolType?: optimization_guide.proto.AXBoolAttribute|null;
              intlistType?: optimization_guide.proto.AXIntListAttribute|null;
              stringlistType?: optimization_guide.proto.AXStringListAttribute|null;
              htmlAttributeName?: string|null;
              stringValue?: string|null;
              intValue?: number|null;
              floatValue?: number|null;
              boolValue?: boolean|null;
              intListValue?: optimization_guide.proto.AXIntList.$Shape|null;
              stringListValue?: optimization_guide.proto.AXStringList.$Shape|null;
              htmlAttributeValue?: string|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ attributeKey?: undefined; stringType?: null; intType?: null; floatType?: null; boolType?: null; intlistType?: null; stringlistType?: null; htmlAttributeName?: null }|{ attributeKey?: "stringType"; stringType: optimization_guide.proto.AXStringAttribute; intType?: null; floatType?: null; boolType?: null; intlistType?: null; stringlistType?: null; htmlAttributeName?: null }|{ attributeKey?: "intType"; stringType?: null; intType: optimization_guide.proto.AXIntAttribute; floatType?: null; boolType?: null; intlistType?: null; stringlistType?: null; htmlAttributeName?: null }|{ attributeKey?: "floatType"; stringType?: null; intType?: null; floatType: optimization_guide.proto.AXFloatAttribute; boolType?: null; intlistType?: null; stringlistType?: null; htmlAttributeName?: null }|{ attributeKey?: "boolType"; stringType?: null; intType?: null; floatType?: null; boolType: optimization_guide.proto.AXBoolAttribute; intlistType?: null; stringlistType?: null; htmlAttributeName?: null }|{ attributeKey?: "intlistType"; stringType?: null; intType?: null; floatType?: null; boolType?: null; intlistType: optimization_guide.proto.AXIntListAttribute; stringlistType?: null; htmlAttributeName?: null }|{ attributeKey?: "stringlistType"; stringType?: null; intType?: null; floatType?: null; boolType?: null; intlistType?: null; stringlistType: optimization_guide.proto.AXStringListAttribute; htmlAttributeName?: null }|{ attributeKey?: "htmlAttributeName"; stringType?: null; intType?: null; floatType?: null; boolType?: null; intlistType?: null; stringlistType?: null; htmlAttributeName: string })
            ) & (
              ({ attributeValue?: undefined; stringValue?: null; intValue?: null; floatValue?: null; boolValue?: null; intListValue?: null; stringListValue?: null; htmlAttributeValue?: null }|{ attributeValue?: "stringValue"; stringValue: string; intValue?: null; floatValue?: null; boolValue?: null; intListValue?: null; stringListValue?: null; htmlAttributeValue?: null }|{ attributeValue?: "intValue"; stringValue?: null; intValue: number; floatValue?: null; boolValue?: null; intListValue?: null; stringListValue?: null; htmlAttributeValue?: null }|{ attributeValue?: "floatValue"; stringValue?: null; intValue?: null; floatValue: number; boolValue?: null; intListValue?: null; stringListValue?: null; htmlAttributeValue?: null }|{ attributeValue?: "boolValue"; stringValue?: null; intValue?: null; floatValue?: null; boolValue: boolean; intListValue?: null; stringListValue?: null; htmlAttributeValue?: null }|{ attributeValue?: "intListValue"; stringValue?: null; intValue?: null; floatValue?: null; boolValue?: null; intListValue: optimization_guide.proto.AXIntList.$Shape; stringListValue?: null; htmlAttributeValue?: null }|{ attributeValue?: "stringListValue"; stringValue?: null; intValue?: null; floatValue?: null; boolValue?: null; intListValue?: null; stringListValue: optimization_guide.proto.AXStringList.$Shape; htmlAttributeValue?: null }|{ attributeValue?: "htmlAttributeValue"; stringValue?: null; intValue?: null; floatValue?: null; boolValue?: null; intListValue?: null; stringListValue?: null; htmlAttributeValue: string })
            );
        }

        /**
         * Properties of a AXIntList.
         * @deprecated Use optimization_guide.proto.AXIntList.$Properties instead.
         */
        interface IAXIntList extends optimization_guide.proto.AXIntList.$Properties {
        }

        /** Represents a AXIntList. */
        class AXIntList {

            /**
             * Constructs a new AXIntList.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AXIntList.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** AXIntList value. */
            value: number[];

            /**
             * Creates a new AXIntList instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AXIntList instance
             */
            static create(properties: optimization_guide.proto.AXIntList.$Shape): optimization_guide.proto.AXIntList & optimization_guide.proto.AXIntList.$Shape;
            static create(properties?: optimization_guide.proto.AXIntList.$Properties): optimization_guide.proto.AXIntList;

            /**
             * Encodes the specified AXIntList message. Does not implicitly {@link optimization_guide.proto.AXIntList.verify|verify} messages.
             * @param message AXIntList message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AXIntList.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a AXIntList message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AXIntList & optimization_guide.proto.AXIntList.$Shape} AXIntList
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AXIntList & optimization_guide.proto.AXIntList.$Shape;

            /**
             * Creates a AXIntList message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AXIntList
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AXIntList;

            /**
             * Creates a plain object from a AXIntList message. Also converts values to other types if specified.
             * @param message AXIntList
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AXIntList, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AXIntList to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AXIntList {

            /** Properties of a AXIntList. */
            interface $Properties {

                /** AXIntList value */
                value?: (number[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a AXIntList. */
            type $Shape = optimization_guide.proto.AXIntList.$Properties;
        }

        /**
         * Properties of a AXStringList.
         * @deprecated Use optimization_guide.proto.AXStringList.$Properties instead.
         */
        interface IAXStringList extends optimization_guide.proto.AXStringList.$Properties {
        }

        /** Represents a AXStringList. */
        class AXStringList {

            /**
             * Constructs a new AXStringList.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AXStringList.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** AXStringList value. */
            value: string[];

            /**
             * Creates a new AXStringList instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AXStringList instance
             */
            static create(properties: optimization_guide.proto.AXStringList.$Shape): optimization_guide.proto.AXStringList & optimization_guide.proto.AXStringList.$Shape;
            static create(properties?: optimization_guide.proto.AXStringList.$Properties): optimization_guide.proto.AXStringList;

            /**
             * Encodes the specified AXStringList message. Does not implicitly {@link optimization_guide.proto.AXStringList.verify|verify} messages.
             * @param message AXStringList message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AXStringList.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a AXStringList message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AXStringList & optimization_guide.proto.AXStringList.$Shape} AXStringList
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AXStringList & optimization_guide.proto.AXStringList.$Shape;

            /**
             * Creates a AXStringList message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AXStringList
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AXStringList;

            /**
             * Creates a plain object from a AXStringList message. Also converts values to other types if specified.
             * @param message AXStringList
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AXStringList, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AXStringList to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AXStringList {

            /** Properties of a AXStringList. */
            interface $Properties {

                /** AXStringList value */
                value?: (string[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a AXStringList. */
            type $Shape = optimization_guide.proto.AXStringList.$Properties;
        }

        /**
         * Properties of a AXRelativeBounds.
         * @deprecated Use optimization_guide.proto.AXRelativeBounds.$Properties instead.
         */
        interface IAXRelativeBounds extends optimization_guide.proto.AXRelativeBounds.$Properties {
        }

        /** Represents a AXRelativeBounds. */
        class AXRelativeBounds {

            /**
             * Constructs a new AXRelativeBounds.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AXRelativeBounds.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** AXRelativeBounds offsetContainerId. */
            offsetContainerId: number;

            /** AXRelativeBounds x. */
            x: number;

            /** AXRelativeBounds y. */
            y: number;

            /** AXRelativeBounds width. */
            width: number;

            /** AXRelativeBounds height. */
            height: number;

            /** AXRelativeBounds transform. */
            transform: number[];

            /**
             * Creates a new AXRelativeBounds instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AXRelativeBounds instance
             */
            static create(properties: optimization_guide.proto.AXRelativeBounds.$Shape): optimization_guide.proto.AXRelativeBounds & optimization_guide.proto.AXRelativeBounds.$Shape;
            static create(properties?: optimization_guide.proto.AXRelativeBounds.$Properties): optimization_guide.proto.AXRelativeBounds;

            /**
             * Encodes the specified AXRelativeBounds message. Does not implicitly {@link optimization_guide.proto.AXRelativeBounds.verify|verify} messages.
             * @param message AXRelativeBounds message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AXRelativeBounds.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a AXRelativeBounds message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AXRelativeBounds & optimization_guide.proto.AXRelativeBounds.$Shape} AXRelativeBounds
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AXRelativeBounds & optimization_guide.proto.AXRelativeBounds.$Shape;

            /**
             * Creates a AXRelativeBounds message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AXRelativeBounds
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AXRelativeBounds;

            /**
             * Creates a plain object from a AXRelativeBounds message. Also converts values to other types if specified.
             * @param message AXRelativeBounds
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AXRelativeBounds, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AXRelativeBounds to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AXRelativeBounds {

            /** Properties of a AXRelativeBounds. */
            interface $Properties {

                /** AXRelativeBounds offsetContainerId */
                offsetContainerId?: (number|null);

                /** AXRelativeBounds x */
                x?: (number|null);

                /** AXRelativeBounds y */
                y?: (number|null);

                /** AXRelativeBounds width */
                width?: (number|null);

                /** AXRelativeBounds height */
                height?: (number|null);

                /** AXRelativeBounds transform */
                transform?: (number[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a AXRelativeBounds. */
            type $Shape = optimization_guide.proto.AXRelativeBounds.$Properties;
        }

        /**
         * Properties of a PageContext.
         * @deprecated Use optimization_guide.proto.PageContext.$Properties instead.
         */
        interface IPageContext extends optimization_guide.proto.PageContext.$Properties {
        }

        /** Represents a PageContext. */
        class PageContext {

            /**
             * Constructs a new PageContext.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.PageContext.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** PageContext url. */
            url: string;

            /** PageContext title. */
            title: string;

            /** PageContext axTreeData. */
            axTreeData?: (optimization_guide.proto.AXTreeUpdate.$Properties|null);

            /** PageContext innerText. */
            innerText: string;

            /** PageContext innerTextOffset. */
            innerTextOffset: (number|Long);

            /** PageContext pagePassages. */
            pagePassages: string[];

            /** PageContext tabScreenshot. */
            tabScreenshot: string;

            /** PageContext pdfData. */
            pdfData: string;

            /** PageContext annotatedPageContent. */
            annotatedPageContent?: (optimization_guide.proto.AnnotatedPageContent.$Properties|null);

            /**
             * Creates a new PageContext instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PageContext instance
             */
            static create(properties: optimization_guide.proto.PageContext.$Shape): optimization_guide.proto.PageContext & optimization_guide.proto.PageContext.$Shape;
            static create(properties?: optimization_guide.proto.PageContext.$Properties): optimization_guide.proto.PageContext;

            /**
             * Encodes the specified PageContext message. Does not implicitly {@link optimization_guide.proto.PageContext.verify|verify} messages.
             * @param message PageContext message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.PageContext.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PageContext message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.PageContext & optimization_guide.proto.PageContext.$Shape} PageContext
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.PageContext & optimization_guide.proto.PageContext.$Shape;

            /**
             * Creates a PageContext message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PageContext
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.PageContext;

            /**
             * Creates a plain object from a PageContext message. Also converts values to other types if specified.
             * @param message PageContext
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.PageContext, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PageContext to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace PageContext {

            /** Properties of a PageContext. */
            interface $Properties {

                /** PageContext url */
                url?: (string|null);

                /** PageContext title */
                title?: (string|null);

                /** PageContext axTreeData */
                axTreeData?: (optimization_guide.proto.AXTreeUpdate.$Properties|null);

                /** PageContext innerText */
                innerText?: (string|null);

                /** PageContext innerTextOffset */
                innerTextOffset?: (number|Long|null);

                /** PageContext pagePassages */
                pagePassages?: (string[]|null);

                /** PageContext tabScreenshot */
                tabScreenshot?: (string|null);

                /** PageContext pdfData */
                pdfData?: (string|null);

                /** PageContext annotatedPageContent */
                annotatedPageContent?: (optimization_guide.proto.AnnotatedPageContent.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a PageContext. */
            type $Shape = {
              url?: string|null;
              title?: string|null;
              axTreeData?: optimization_guide.proto.AXTreeUpdate.$Shape|null;
              innerText?: string|null;
              innerTextOffset?: number|Long|null;
              pagePassages?: string[]|null;
              tabScreenshot?: string|null;
              pdfData?: string|null;
              annotatedPageContent?: optimization_guide.proto.AnnotatedPageContent.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        /**
         * Properties of an AnnotatedPageContent.
         * @deprecated Use optimization_guide.proto.AnnotatedPageContent.$Properties instead.
         */
        interface IAnnotatedPageContent extends optimization_guide.proto.AnnotatedPageContent.$Properties {
        }

        /** Represents an AnnotatedPageContent. */
        class AnnotatedPageContent {

            /**
             * Constructs a new AnnotatedPageContent.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AnnotatedPageContent.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** AnnotatedPageContent version. */
            version: optimization_guide.proto.AnnotatedPageContentVersion;

            /** AnnotatedPageContent mode. */
            mode: optimization_guide.proto.AnnotatedPageContentMode;

            /** AnnotatedPageContent rootNode. */
            rootNode?: (optimization_guide.proto.ContentNode.$Properties|null);

            /** AnnotatedPageContent mainFrameData. */
            mainFrameData?: (optimization_guide.proto.FrameData.$Properties|null);

            /** AnnotatedPageContent pageInteractionInfo. */
            pageInteractionInfo?: (optimization_guide.proto.PageInteractionInfo.$Properties|null);

            /** AnnotatedPageContent viewportGeometry. */
            viewportGeometry?: (optimization_guide.proto.BoundingRect.$Properties|null);

            /** AnnotatedPageContent tabId. */
            tabId: number;

            /** AnnotatedPageContent popupWindow. */
            popupWindow?: (optimization_guide.proto.PopupWindow.$Properties|null);

            /** AnnotatedPageContent profileInformation. */
            profileInformation?: (optimization_guide.proto.ProfileInformation.$Properties|null);

            /** AnnotatedPageContent geminiInChromePageMetadata. */
            geminiInChromePageMetadata?: (optimization_guide.proto.GeminiInChromePageMetadata.$Properties|null);

            /**
             * Creates a new AnnotatedPageContent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AnnotatedPageContent instance
             */
            static create(properties: optimization_guide.proto.AnnotatedPageContent.$Shape): optimization_guide.proto.AnnotatedPageContent & optimization_guide.proto.AnnotatedPageContent.$Shape;
            static create(properties?: optimization_guide.proto.AnnotatedPageContent.$Properties): optimization_guide.proto.AnnotatedPageContent;

            /**
             * Encodes the specified AnnotatedPageContent message. Does not implicitly {@link optimization_guide.proto.AnnotatedPageContent.verify|verify} messages.
             * @param message AnnotatedPageContent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AnnotatedPageContent.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AnnotatedPageContent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AnnotatedPageContent & optimization_guide.proto.AnnotatedPageContent.$Shape} AnnotatedPageContent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AnnotatedPageContent & optimization_guide.proto.AnnotatedPageContent.$Shape;

            /**
             * Creates an AnnotatedPageContent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AnnotatedPageContent
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AnnotatedPageContent;

            /**
             * Creates a plain object from an AnnotatedPageContent message. Also converts values to other types if specified.
             * @param message AnnotatedPageContent
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AnnotatedPageContent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AnnotatedPageContent to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AnnotatedPageContent {

            /** Properties of an AnnotatedPageContent. */
            interface $Properties {

                /** AnnotatedPageContent version */
                version?: (optimization_guide.proto.AnnotatedPageContentVersion|null);

                /** AnnotatedPageContent mode */
                mode?: (optimization_guide.proto.AnnotatedPageContentMode|null);

                /** AnnotatedPageContent rootNode */
                rootNode?: (optimization_guide.proto.ContentNode.$Properties|null);

                /** AnnotatedPageContent mainFrameData */
                mainFrameData?: (optimization_guide.proto.FrameData.$Properties|null);

                /** AnnotatedPageContent pageInteractionInfo */
                pageInteractionInfo?: (optimization_guide.proto.PageInteractionInfo.$Properties|null);

                /** AnnotatedPageContent viewportGeometry */
                viewportGeometry?: (optimization_guide.proto.BoundingRect.$Properties|null);

                /** AnnotatedPageContent tabId */
                tabId?: (number|null);

                /** AnnotatedPageContent popupWindow */
                popupWindow?: (optimization_guide.proto.PopupWindow.$Properties|null);

                /** AnnotatedPageContent profileInformation */
                profileInformation?: (optimization_guide.proto.ProfileInformation.$Properties|null);

                /** AnnotatedPageContent geminiInChromePageMetadata */
                geminiInChromePageMetadata?: (optimization_guide.proto.GeminiInChromePageMetadata.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an AnnotatedPageContent. */
            type $Shape = {
              version?: optimization_guide.proto.AnnotatedPageContentVersion|null;
              mode?: optimization_guide.proto.AnnotatedPageContentMode|null;
              rootNode?: optimization_guide.proto.ContentNode.$Shape|null;
              mainFrameData?: optimization_guide.proto.FrameData.$Shape|null;
              pageInteractionInfo?: optimization_guide.proto.PageInteractionInfo.$Shape|null;
              viewportGeometry?: optimization_guide.proto.BoundingRect.$Shape|null;
              tabId?: number|null;
              popupWindow?: optimization_guide.proto.PopupWindow.$Shape|null;
              profileInformation?: optimization_guide.proto.ProfileInformation.$Shape|null;
              geminiInChromePageMetadata?: optimization_guide.proto.GeminiInChromePageMetadata.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        /**
         * Properties of a ContentNode.
         * @deprecated Use optimization_guide.proto.ContentNode.$Properties instead.
         */
        interface IContentNode extends optimization_guide.proto.ContentNode.$Properties {
        }

        /** Represents a ContentNode. */
        class ContentNode {

            /**
             * Constructs a new ContentNode.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.ContentNode.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ContentNode childrenNodes. */
            childrenNodes: optimization_guide.proto.ContentNode.$Properties[];

            /** ContentNode contentAttributes. */
            contentAttributes?: (optimization_guide.proto.ContentAttributes.$Properties|null);

            /**
             * Creates a new ContentNode instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ContentNode instance
             */
            static create(properties: optimization_guide.proto.ContentNode.$Shape): optimization_guide.proto.ContentNode & optimization_guide.proto.ContentNode.$Shape;
            static create(properties?: optimization_guide.proto.ContentNode.$Properties): optimization_guide.proto.ContentNode;

            /**
             * Encodes the specified ContentNode message. Does not implicitly {@link optimization_guide.proto.ContentNode.verify|verify} messages.
             * @param message ContentNode message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.ContentNode.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ContentNode message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.ContentNode & optimization_guide.proto.ContentNode.$Shape} ContentNode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.ContentNode & optimization_guide.proto.ContentNode.$Shape;

            /**
             * Creates a ContentNode message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ContentNode
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.ContentNode;

            /**
             * Creates a plain object from a ContentNode message. Also converts values to other types if specified.
             * @param message ContentNode
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.ContentNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ContentNode to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace ContentNode {

            /** Properties of a ContentNode. */
            interface $Properties {

                /** ContentNode childrenNodes */
                childrenNodes?: (optimization_guide.proto.ContentNode.$Properties[]|null);

                /** ContentNode contentAttributes */
                contentAttributes?: (optimization_guide.proto.ContentAttributes.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a ContentNode. */
            type $Shape = {
              childrenNodes?: optimization_guide.proto.ContentNode.$Shape[]|null;
              contentAttributes?: optimization_guide.proto.ContentAttributes.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        /**
         * Properties of a ContentAttributes.
         * @deprecated Use optimization_guide.proto.ContentAttributes.$Properties instead.
         */
        interface IContentAttributes extends optimization_guide.proto.ContentAttributes.$Properties {
        }

        /** Represents a ContentAttributes. */
        class ContentAttributes {

            /**
             * Constructs a new ContentAttributes.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.ContentAttributes.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ContentAttributes textData. */
            textData?: (optimization_guide.proto.TextInfo.$Properties|null);

            /** ContentAttributes imageData. */
            imageData?: (optimization_guide.proto.ImageInfo.$Properties|null);

            /** ContentAttributes svgRootData. */
            svgRootData?: (optimization_guide.proto.SVGRootData.$Properties|null);

            /** ContentAttributes canvasData. */
            canvasData?: (optimization_guide.proto.CanvasData.$Properties|null);

            /** ContentAttributes videoData. */
            videoData?: (optimization_guide.proto.VideoData.$Properties|null);

            /** ContentAttributes anchorData. */
            anchorData?: (optimization_guide.proto.AnchorData.$Properties|null);

            /** ContentAttributes formData. */
            formData?: (optimization_guide.proto.FormInfo.$Properties|null);

            /** ContentAttributes formControlData. */
            formControlData?: (optimization_guide.proto.FormControlData.$Properties|null);

            /** ContentAttributes tableData. */
            tableData?: (optimization_guide.proto.TableData.$Properties|null);

            /** ContentAttributes iframeData. */
            iframeData?: (optimization_guide.proto.IframeData.$Properties|null);

            /** ContentAttributes tableRowData. */
            tableRowData?: (optimization_guide.proto.TableRowData.$Properties|null);

            /** ContentAttributes commonAncestorDomNodeId. */
            commonAncestorDomNodeId: number;

            /** ContentAttributes attributeType. */
            attributeType: optimization_guide.proto.ContentAttributeType;

            /** ContentAttributes geometry. */
            geometry?: (optimization_guide.proto.Geometry.$Properties|null);

            /** ContentAttributes interactionInfo. */
            interactionInfo?: (optimization_guide.proto.InteractionInfo.$Properties|null);

            /** ContentAttributes annotatedRoles. */
            annotatedRoles: optimization_guide.proto.AnnotatedRole[];

            /** ContentAttributes label. */
            label: string;

            /** ContentAttributes labelForDomNodeId. */
            labelForDomNodeId: number;

            /** ContentAttributes ariaRole. */
            ariaRole: optimization_guide.proto.AXRole;

            /** ContentAttributes isAdRelated. */
            isAdRelated: boolean;

            /** ContentAttributes redactionDecision. */
            redactionDecision: optimization_guide.proto.RedactionDecision;

            /** ContentAttributes contentData. */
            contentData?: ("textData"|"imageData"|"svgRootData"|"canvasData"|"videoData"|"anchorData"|"formData"|"formControlData"|"tableData"|"iframeData"|"tableRowData");

            /**
             * Creates a new ContentAttributes instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ContentAttributes instance
             */
            static create(properties: optimization_guide.proto.ContentAttributes.$Shape): optimization_guide.proto.ContentAttributes & optimization_guide.proto.ContentAttributes.$Shape;
            static create(properties?: optimization_guide.proto.ContentAttributes.$Properties): optimization_guide.proto.ContentAttributes;

            /**
             * Encodes the specified ContentAttributes message. Does not implicitly {@link optimization_guide.proto.ContentAttributes.verify|verify} messages.
             * @param message ContentAttributes message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.ContentAttributes.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ContentAttributes message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.ContentAttributes & optimization_guide.proto.ContentAttributes.$Shape} ContentAttributes
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.ContentAttributes & optimization_guide.proto.ContentAttributes.$Shape;

            /**
             * Creates a ContentAttributes message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ContentAttributes
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.ContentAttributes;

            /**
             * Creates a plain object from a ContentAttributes message. Also converts values to other types if specified.
             * @param message ContentAttributes
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.ContentAttributes, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ContentAttributes to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace ContentAttributes {

            /** Properties of a ContentAttributes. */
            interface $Properties {

                /** ContentAttributes textData */
                textData?: (optimization_guide.proto.TextInfo.$Properties|null);

                /** ContentAttributes imageData */
                imageData?: (optimization_guide.proto.ImageInfo.$Properties|null);

                /** ContentAttributes svgRootData */
                svgRootData?: (optimization_guide.proto.SVGRootData.$Properties|null);

                /** ContentAttributes canvasData */
                canvasData?: (optimization_guide.proto.CanvasData.$Properties|null);

                /** ContentAttributes videoData */
                videoData?: (optimization_guide.proto.VideoData.$Properties|null);

                /** ContentAttributes anchorData */
                anchorData?: (optimization_guide.proto.AnchorData.$Properties|null);

                /** ContentAttributes formData */
                formData?: (optimization_guide.proto.FormInfo.$Properties|null);

                /** ContentAttributes formControlData */
                formControlData?: (optimization_guide.proto.FormControlData.$Properties|null);

                /** ContentAttributes tableData */
                tableData?: (optimization_guide.proto.TableData.$Properties|null);

                /** ContentAttributes iframeData */
                iframeData?: (optimization_guide.proto.IframeData.$Properties|null);

                /** ContentAttributes tableRowData */
                tableRowData?: (optimization_guide.proto.TableRowData.$Properties|null);

                /** ContentAttributes commonAncestorDomNodeId */
                commonAncestorDomNodeId?: (number|null);

                /** ContentAttributes attributeType */
                attributeType?: (optimization_guide.proto.ContentAttributeType|null);

                /** ContentAttributes geometry */
                geometry?: (optimization_guide.proto.Geometry.$Properties|null);

                /** ContentAttributes interactionInfo */
                interactionInfo?: (optimization_guide.proto.InteractionInfo.$Properties|null);

                /** ContentAttributes annotatedRoles */
                annotatedRoles?: (optimization_guide.proto.AnnotatedRole[]|null);

                /** ContentAttributes label */
                label?: (string|null);

                /** ContentAttributes labelForDomNodeId */
                labelForDomNodeId?: (number|null);

                /** ContentAttributes ariaRole */
                ariaRole?: (optimization_guide.proto.AXRole|null);

                /** ContentAttributes isAdRelated */
                isAdRelated?: (boolean|null);

                /** ContentAttributes redactionDecision */
                redactionDecision?: (optimization_guide.proto.RedactionDecision|null);

                /** ContentAttributes contentData */
                contentData?: ("textData"|"imageData"|"svgRootData"|"canvasData"|"videoData"|"anchorData"|"formData"|"formControlData"|"tableData"|"iframeData"|"tableRowData");

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Narrowed shape of a ContentAttributes. */
            type $Shape = {
              textData?: optimization_guide.proto.TextInfo.$Shape|null;
              imageData?: optimization_guide.proto.ImageInfo.$Shape|null;
              svgRootData?: optimization_guide.proto.SVGRootData.$Shape|null;
              canvasData?: optimization_guide.proto.CanvasData.$Shape|null;
              videoData?: optimization_guide.proto.VideoData.$Shape|null;
              anchorData?: optimization_guide.proto.AnchorData.$Shape|null;
              formData?: optimization_guide.proto.FormInfo.$Shape|null;
              formControlData?: optimization_guide.proto.FormControlData.$Shape|null;
              tableData?: optimization_guide.proto.TableData.$Shape|null;
              iframeData?: optimization_guide.proto.IframeData.$Shape|null;
              tableRowData?: optimization_guide.proto.TableRowData.$Shape|null;
              commonAncestorDomNodeId?: number|null;
              attributeType?: optimization_guide.proto.ContentAttributeType|null;
              geometry?: optimization_guide.proto.Geometry.$Shape|null;
              interactionInfo?: optimization_guide.proto.InteractionInfo.$Shape|null;
              annotatedRoles?: optimization_guide.proto.AnnotatedRole[]|null;
              label?: string|null;
              labelForDomNodeId?: number|null;
              ariaRole?: optimization_guide.proto.AXRole|null;
              isAdRelated?: boolean|null;
              redactionDecision?: optimization_guide.proto.RedactionDecision|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ contentData?: undefined; textData?: null; imageData?: null; svgRootData?: null; canvasData?: null; videoData?: null; anchorData?: null; formData?: null; formControlData?: null; tableData?: null; iframeData?: null; tableRowData?: null }|{ contentData?: "textData"; textData: optimization_guide.proto.TextInfo.$Shape; imageData?: null; svgRootData?: null; canvasData?: null; videoData?: null; anchorData?: null; formData?: null; formControlData?: null; tableData?: null; iframeData?: null; tableRowData?: null }|{ contentData?: "imageData"; textData?: null; imageData: optimization_guide.proto.ImageInfo.$Shape; svgRootData?: null; canvasData?: null; videoData?: null; anchorData?: null; formData?: null; formControlData?: null; tableData?: null; iframeData?: null; tableRowData?: null }|{ contentData?: "svgRootData"; textData?: null; imageData?: null; svgRootData: optimization_guide.proto.SVGRootData.$Shape; canvasData?: null; videoData?: null; anchorData?: null; formData?: null; formControlData?: null; tableData?: null; iframeData?: null; tableRowData?: null }|{ contentData?: "canvasData"; textData?: null; imageData?: null; svgRootData?: null; canvasData: optimization_guide.proto.CanvasData.$Shape; videoData?: null; anchorData?: null; formData?: null; formControlData?: null; tableData?: null; iframeData?: null; tableRowData?: null }|{ contentData?: "videoData"; textData?: null; imageData?: null; svgRootData?: null; canvasData?: null; videoData: optimization_guide.proto.VideoData.$Shape; anchorData?: null; formData?: null; formControlData?: null; tableData?: null; iframeData?: null; tableRowData?: null }|{ contentData?: "anchorData"; textData?: null; imageData?: null; svgRootData?: null; canvasData?: null; videoData?: null; anchorData: optimization_guide.proto.AnchorData.$Shape; formData?: null; formControlData?: null; tableData?: null; iframeData?: null; tableRowData?: null }|{ contentData?: "formData"; textData?: null; imageData?: null; svgRootData?: null; canvasData?: null; videoData?: null; anchorData?: null; formData: optimization_guide.proto.FormInfo.$Shape; formControlData?: null; tableData?: null; iframeData?: null; tableRowData?: null }|{ contentData?: "formControlData"; textData?: null; imageData?: null; svgRootData?: null; canvasData?: null; videoData?: null; anchorData?: null; formData?: null; formControlData: optimization_guide.proto.FormControlData.$Shape; tableData?: null; iframeData?: null; tableRowData?: null }|{ contentData?: "tableData"; textData?: null; imageData?: null; svgRootData?: null; canvasData?: null; videoData?: null; anchorData?: null; formData?: null; formControlData?: null; tableData: optimization_guide.proto.TableData.$Shape; iframeData?: null; tableRowData?: null }|{ contentData?: "iframeData"; textData?: null; imageData?: null; svgRootData?: null; canvasData?: null; videoData?: null; anchorData?: null; formData?: null; formControlData?: null; tableData?: null; iframeData: optimization_guide.proto.IframeData.$Shape; tableRowData?: null }|{ contentData?: "tableRowData"; textData?: null; imageData?: null; svgRootData?: null; canvasData?: null; videoData?: null; anchorData?: null; formData?: null; formControlData?: null; tableData?: null; iframeData?: null; tableRowData: optimization_guide.proto.TableRowData.$Shape })
            );
        }

        /**
         * Properties of a Geometry.
         * @deprecated Use optimization_guide.proto.Geometry.$Properties instead.
         */
        interface IGeometry extends optimization_guide.proto.Geometry.$Properties {
        }

        /** Represents a Geometry. */
        class Geometry {

            /**
             * Constructs a new Geometry.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.Geometry.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Geometry outerBoundingBox. */
            outerBoundingBox?: (optimization_guide.proto.BoundingRect.$Properties|null);

            /** Geometry visibleBoundingBox. */
            visibleBoundingBox?: (optimization_guide.proto.BoundingRect.$Properties|null);

            /** Geometry fragmentVisibleBoundingBoxes. */
            fragmentVisibleBoundingBoxes: optimization_guide.proto.BoundingRect.$Properties[];

            /** Geometry isFixedOrStickyPosition. */
            isFixedOrStickyPosition: boolean;

            /** Geometry cssPosition. */
            cssPosition: optimization_guide.proto.CssPosition;

            /**
             * Creates a new Geometry instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Geometry instance
             */
            static create(properties: optimization_guide.proto.Geometry.$Shape): optimization_guide.proto.Geometry & optimization_guide.proto.Geometry.$Shape;
            static create(properties?: optimization_guide.proto.Geometry.$Properties): optimization_guide.proto.Geometry;

            /**
             * Encodes the specified Geometry message. Does not implicitly {@link optimization_guide.proto.Geometry.verify|verify} messages.
             * @param message Geometry message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.Geometry.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Geometry message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.Geometry & optimization_guide.proto.Geometry.$Shape} Geometry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.Geometry & optimization_guide.proto.Geometry.$Shape;

            /**
             * Creates a Geometry message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Geometry
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.Geometry;

            /**
             * Creates a plain object from a Geometry message. Also converts values to other types if specified.
             * @param message Geometry
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.Geometry, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Geometry to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace Geometry {

            /** Properties of a Geometry. */
            interface $Properties {

                /** Geometry outerBoundingBox */
                outerBoundingBox?: (optimization_guide.proto.BoundingRect.$Properties|null);

                /** Geometry visibleBoundingBox */
                visibleBoundingBox?: (optimization_guide.proto.BoundingRect.$Properties|null);

                /** Geometry fragmentVisibleBoundingBoxes */
                fragmentVisibleBoundingBoxes?: (optimization_guide.proto.BoundingRect.$Properties[]|null);

                /** Geometry isFixedOrStickyPosition */
                isFixedOrStickyPosition?: (boolean|null);

                /** Geometry cssPosition */
                cssPosition?: (optimization_guide.proto.CssPosition|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Geometry. */
            type $Shape = optimization_guide.proto.Geometry.$Properties;
        }

        /**
         * Properties of a BoundingRect.
         * @deprecated Use optimization_guide.proto.BoundingRect.$Properties instead.
         */
        interface IBoundingRect extends optimization_guide.proto.BoundingRect.$Properties {
        }

        /** Represents a BoundingRect. */
        class BoundingRect {

            /**
             * Constructs a new BoundingRect.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.BoundingRect.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** BoundingRect x. */
            x: number;

            /** BoundingRect y. */
            y: number;

            /** BoundingRect width. */
            width: number;

            /** BoundingRect height. */
            height: number;

            /**
             * Creates a new BoundingRect instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BoundingRect instance
             */
            static create(properties: optimization_guide.proto.BoundingRect.$Shape): optimization_guide.proto.BoundingRect & optimization_guide.proto.BoundingRect.$Shape;
            static create(properties?: optimization_guide.proto.BoundingRect.$Properties): optimization_guide.proto.BoundingRect;

            /**
             * Encodes the specified BoundingRect message. Does not implicitly {@link optimization_guide.proto.BoundingRect.verify|verify} messages.
             * @param message BoundingRect message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.BoundingRect.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BoundingRect message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.BoundingRect & optimization_guide.proto.BoundingRect.$Shape} BoundingRect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.BoundingRect & optimization_guide.proto.BoundingRect.$Shape;

            /**
             * Creates a BoundingRect message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BoundingRect
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.BoundingRect;

            /**
             * Creates a plain object from a BoundingRect message. Also converts values to other types if specified.
             * @param message BoundingRect
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.BoundingRect, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BoundingRect to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace BoundingRect {

            /** Properties of a BoundingRect. */
            interface $Properties {

                /** BoundingRect x */
                x?: (number|null);

                /** BoundingRect y */
                y?: (number|null);

                /** BoundingRect width */
                width?: (number|null);

                /** BoundingRect height */
                height?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a BoundingRect. */
            type $Shape = optimization_guide.proto.BoundingRect.$Properties;
        }

        /**
         * Properties of an InteractionInfo.
         * @deprecated Use optimization_guide.proto.InteractionInfo.$Properties instead.
         */
        interface IInteractionInfo extends optimization_guide.proto.InteractionInfo.$Properties {
        }

        /** Represents an InteractionInfo. */
        class InteractionInfo {

            /**
             * Constructs a new InteractionInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.InteractionInfo.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** InteractionInfo scrollerInfo. */
            scrollerInfo?: (optimization_guide.proto.ScrollerInfo.$Properties|null);

            /** InteractionInfo isSelectable. */
            isSelectable: boolean;

            /** InteractionInfo isEditable. */
            isEditable: boolean;

            /** InteractionInfo canResizeHorizontal. */
            canResizeHorizontal: boolean;

            /** InteractionInfo canResizeVertical. */
            canResizeVertical: boolean;

            /** InteractionInfo isFocusable. */
            isFocusable: boolean;

            /** InteractionInfo isDraggable. */
            isDraggable: boolean;

            /** InteractionInfo isClickable. */
            isClickable: boolean;

            /** InteractionInfo documentScopedZOrder. */
            documentScopedZOrder: number;

            /** InteractionInfo debugClickabilityReasons. */
            debugClickabilityReasons: optimization_guide.proto.ClickabilityReason[];

            /** InteractionInfo clickabilityReasons. */
            clickabilityReasons: optimization_guide.proto.ClickabilityReason[];

            /** InteractionInfo isDisabled. */
            isDisabled: boolean;

            /** InteractionInfo interactionDisabledReasons. */
            interactionDisabledReasons: optimization_guide.proto.InteractionDisabledReason[];

            /** InteractionInfo isTabbable. */
            isTabbable: boolean;

            /** InteractionInfo hasAriaActivedescendant. */
            hasAriaActivedescendant: boolean;

            /** InteractionInfo ariaActionTargetNodeIds. */
            ariaActionTargetNodeIds: number[];

            /**
             * Creates a new InteractionInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns InteractionInfo instance
             */
            static create(properties: optimization_guide.proto.InteractionInfo.$Shape): optimization_guide.proto.InteractionInfo & optimization_guide.proto.InteractionInfo.$Shape;
            static create(properties?: optimization_guide.proto.InteractionInfo.$Properties): optimization_guide.proto.InteractionInfo;

            /**
             * Encodes the specified InteractionInfo message. Does not implicitly {@link optimization_guide.proto.InteractionInfo.verify|verify} messages.
             * @param message InteractionInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.InteractionInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an InteractionInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.InteractionInfo & optimization_guide.proto.InteractionInfo.$Shape} InteractionInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.InteractionInfo & optimization_guide.proto.InteractionInfo.$Shape;

            /**
             * Creates an InteractionInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns InteractionInfo
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.InteractionInfo;

            /**
             * Creates a plain object from an InteractionInfo message. Also converts values to other types if specified.
             * @param message InteractionInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.InteractionInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this InteractionInfo to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace InteractionInfo {

            /** Properties of an InteractionInfo. */
            interface $Properties {

                /** InteractionInfo scrollerInfo */
                scrollerInfo?: (optimization_guide.proto.ScrollerInfo.$Properties|null);

                /** InteractionInfo isSelectable */
                isSelectable?: (boolean|null);

                /** InteractionInfo isEditable */
                isEditable?: (boolean|null);

                /** InteractionInfo canResizeHorizontal */
                canResizeHorizontal?: (boolean|null);

                /** InteractionInfo canResizeVertical */
                canResizeVertical?: (boolean|null);

                /** InteractionInfo isFocusable */
                isFocusable?: (boolean|null);

                /** InteractionInfo isDraggable */
                isDraggable?: (boolean|null);

                /** InteractionInfo isClickable */
                isClickable?: (boolean|null);

                /** InteractionInfo documentScopedZOrder */
                documentScopedZOrder?: (number|null);

                /** InteractionInfo debugClickabilityReasons */
                debugClickabilityReasons?: (optimization_guide.proto.ClickabilityReason[]|null);

                /** InteractionInfo clickabilityReasons */
                clickabilityReasons?: (optimization_guide.proto.ClickabilityReason[]|null);

                /** InteractionInfo isDisabled */
                isDisabled?: (boolean|null);

                /** InteractionInfo interactionDisabledReasons */
                interactionDisabledReasons?: (optimization_guide.proto.InteractionDisabledReason[]|null);

                /** InteractionInfo isTabbable */
                isTabbable?: (boolean|null);

                /** InteractionInfo hasAriaActivedescendant */
                hasAriaActivedescendant?: (boolean|null);

                /** InteractionInfo ariaActionTargetNodeIds */
                ariaActionTargetNodeIds?: (number[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an InteractionInfo. */
            type $Shape = optimization_guide.proto.InteractionInfo.$Properties;
        }

        /**
         * Properties of a ScrollerInfo.
         * @deprecated Use optimization_guide.proto.ScrollerInfo.$Properties instead.
         */
        interface IScrollerInfo extends optimization_guide.proto.ScrollerInfo.$Properties {
        }

        /** Represents a ScrollerInfo. */
        class ScrollerInfo {

            /**
             * Constructs a new ScrollerInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.ScrollerInfo.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ScrollerInfo scrollingBounds. */
            scrollingBounds?: (optimization_guide.proto.BoundingSize.$Properties|null);

            /** ScrollerInfo visibleArea. */
            visibleArea?: (optimization_guide.proto.BoundingRect.$Properties|null);

            /** ScrollerInfo userScrollableHorizontal. */
            userScrollableHorizontal: boolean;

            /** ScrollerInfo userScrollableVertical. */
            userScrollableVertical: boolean;

            /**
             * Creates a new ScrollerInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ScrollerInfo instance
             */
            static create(properties: optimization_guide.proto.ScrollerInfo.$Shape): optimization_guide.proto.ScrollerInfo & optimization_guide.proto.ScrollerInfo.$Shape;
            static create(properties?: optimization_guide.proto.ScrollerInfo.$Properties): optimization_guide.proto.ScrollerInfo;

            /**
             * Encodes the specified ScrollerInfo message. Does not implicitly {@link optimization_guide.proto.ScrollerInfo.verify|verify} messages.
             * @param message ScrollerInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.ScrollerInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ScrollerInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.ScrollerInfo & optimization_guide.proto.ScrollerInfo.$Shape} ScrollerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.ScrollerInfo & optimization_guide.proto.ScrollerInfo.$Shape;

            /**
             * Creates a ScrollerInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ScrollerInfo
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.ScrollerInfo;

            /**
             * Creates a plain object from a ScrollerInfo message. Also converts values to other types if specified.
             * @param message ScrollerInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.ScrollerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ScrollerInfo to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace ScrollerInfo {

            /** Properties of a ScrollerInfo. */
            interface $Properties {

                /** ScrollerInfo scrollingBounds */
                scrollingBounds?: (optimization_guide.proto.BoundingSize.$Properties|null);

                /** ScrollerInfo visibleArea */
                visibleArea?: (optimization_guide.proto.BoundingRect.$Properties|null);

                /** ScrollerInfo userScrollableHorizontal */
                userScrollableHorizontal?: (boolean|null);

                /** ScrollerInfo userScrollableVertical */
                userScrollableVertical?: (boolean|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a ScrollerInfo. */
            type $Shape = optimization_guide.proto.ScrollerInfo.$Properties;
        }

        /**
         * Properties of a BoundingSize.
         * @deprecated Use optimization_guide.proto.BoundingSize.$Properties instead.
         */
        interface IBoundingSize extends optimization_guide.proto.BoundingSize.$Properties {
        }

        /** Represents a BoundingSize. */
        class BoundingSize {

            /**
             * Constructs a new BoundingSize.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.BoundingSize.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** BoundingSize width. */
            width: number;

            /** BoundingSize height. */
            height: number;

            /**
             * Creates a new BoundingSize instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BoundingSize instance
             */
            static create(properties: optimization_guide.proto.BoundingSize.$Shape): optimization_guide.proto.BoundingSize & optimization_guide.proto.BoundingSize.$Shape;
            static create(properties?: optimization_guide.proto.BoundingSize.$Properties): optimization_guide.proto.BoundingSize;

            /**
             * Encodes the specified BoundingSize message. Does not implicitly {@link optimization_guide.proto.BoundingSize.verify|verify} messages.
             * @param message BoundingSize message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.BoundingSize.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BoundingSize message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.BoundingSize & optimization_guide.proto.BoundingSize.$Shape} BoundingSize
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.BoundingSize & optimization_guide.proto.BoundingSize.$Shape;

            /**
             * Creates a BoundingSize message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BoundingSize
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.BoundingSize;

            /**
             * Creates a plain object from a BoundingSize message. Also converts values to other types if specified.
             * @param message BoundingSize
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.BoundingSize, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BoundingSize to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace BoundingSize {

            /** Properties of a BoundingSize. */
            interface $Properties {

                /** BoundingSize width */
                width?: (number|null);

                /** BoundingSize height */
                height?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a BoundingSize. */
            type $Shape = optimization_guide.proto.BoundingSize.$Properties;
        }

        /**
         * Properties of a TextInfo.
         * @deprecated Use optimization_guide.proto.TextInfo.$Properties instead.
         */
        interface ITextInfo extends optimization_guide.proto.TextInfo.$Properties {
        }

        /** Represents a TextInfo. */
        class TextInfo {

            /**
             * Constructs a new TextInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.TextInfo.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** TextInfo textContent. */
            textContent: string;

            /** TextInfo textStyle. */
            textStyle?: (optimization_guide.proto.TextStyle.$Properties|null);

            /**
             * Creates a new TextInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TextInfo instance
             */
            static create(properties: optimization_guide.proto.TextInfo.$Shape): optimization_guide.proto.TextInfo & optimization_guide.proto.TextInfo.$Shape;
            static create(properties?: optimization_guide.proto.TextInfo.$Properties): optimization_guide.proto.TextInfo;

            /**
             * Encodes the specified TextInfo message. Does not implicitly {@link optimization_guide.proto.TextInfo.verify|verify} messages.
             * @param message TextInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.TextInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TextInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.TextInfo & optimization_guide.proto.TextInfo.$Shape} TextInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.TextInfo & optimization_guide.proto.TextInfo.$Shape;

            /**
             * Creates a TextInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TextInfo
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.TextInfo;

            /**
             * Creates a plain object from a TextInfo message. Also converts values to other types if specified.
             * @param message TextInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.TextInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TextInfo to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace TextInfo {

            /** Properties of a TextInfo. */
            interface $Properties {

                /** TextInfo textContent */
                textContent?: (string|null);

                /** TextInfo textStyle */
                textStyle?: (optimization_guide.proto.TextStyle.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a TextInfo. */
            type $Shape = optimization_guide.proto.TextInfo.$Properties;
        }

        /**
         * Properties of a TextStyle.
         * @deprecated Use optimization_guide.proto.TextStyle.$Properties instead.
         */
        interface ITextStyle extends optimization_guide.proto.TextStyle.$Properties {
        }

        /** Represents a TextStyle. */
        class TextStyle {

            /**
             * Constructs a new TextStyle.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.TextStyle.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** TextStyle textSize. */
            textSize: optimization_guide.proto.TextSize;

            /** TextStyle hasEmphasis. */
            hasEmphasis: boolean;

            /** TextStyle color. */
            color: number;

            /**
             * Creates a new TextStyle instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TextStyle instance
             */
            static create(properties: optimization_guide.proto.TextStyle.$Shape): optimization_guide.proto.TextStyle & optimization_guide.proto.TextStyle.$Shape;
            static create(properties?: optimization_guide.proto.TextStyle.$Properties): optimization_guide.proto.TextStyle;

            /**
             * Encodes the specified TextStyle message. Does not implicitly {@link optimization_guide.proto.TextStyle.verify|verify} messages.
             * @param message TextStyle message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.TextStyle.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TextStyle message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.TextStyle & optimization_guide.proto.TextStyle.$Shape} TextStyle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.TextStyle & optimization_guide.proto.TextStyle.$Shape;

            /**
             * Creates a TextStyle message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TextStyle
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.TextStyle;

            /**
             * Creates a plain object from a TextStyle message. Also converts values to other types if specified.
             * @param message TextStyle
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.TextStyle, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TextStyle to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace TextStyle {

            /** Properties of a TextStyle. */
            interface $Properties {

                /** TextStyle textSize */
                textSize?: (optimization_guide.proto.TextSize|null);

                /** TextStyle hasEmphasis */
                hasEmphasis?: (boolean|null);

                /** TextStyle color */
                color?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a TextStyle. */
            type $Shape = optimization_guide.proto.TextStyle.$Properties;
        }

        /**
         * Properties of an ImageInfo.
         * @deprecated Use optimization_guide.proto.ImageInfo.$Properties instead.
         */
        interface IImageInfo extends optimization_guide.proto.ImageInfo.$Properties {
        }

        /** Represents an ImageInfo. */
        class ImageInfo {

            /**
             * Constructs a new ImageInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.ImageInfo.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ImageInfo imageCaption. */
            imageCaption: string;

            /** ImageInfo securityOrigin. */
            securityOrigin?: (optimization_guide.proto.SecurityOrigin.$Properties|null);

            /** ImageInfo url. */
            url: string;

            /**
             * Creates a new ImageInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ImageInfo instance
             */
            static create(properties: optimization_guide.proto.ImageInfo.$Shape): optimization_guide.proto.ImageInfo & optimization_guide.proto.ImageInfo.$Shape;
            static create(properties?: optimization_guide.proto.ImageInfo.$Properties): optimization_guide.proto.ImageInfo;

            /**
             * Encodes the specified ImageInfo message. Does not implicitly {@link optimization_guide.proto.ImageInfo.verify|verify} messages.
             * @param message ImageInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.ImageInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ImageInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.ImageInfo & optimization_guide.proto.ImageInfo.$Shape} ImageInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.ImageInfo & optimization_guide.proto.ImageInfo.$Shape;

            /**
             * Creates an ImageInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ImageInfo
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.ImageInfo;

            /**
             * Creates a plain object from an ImageInfo message. Also converts values to other types if specified.
             * @param message ImageInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.ImageInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ImageInfo to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace ImageInfo {

            /** Properties of an ImageInfo. */
            interface $Properties {

                /** ImageInfo imageCaption */
                imageCaption?: (string|null);

                /** ImageInfo securityOrigin */
                securityOrigin?: (optimization_guide.proto.SecurityOrigin.$Properties|null);

                /** ImageInfo url */
                url?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an ImageInfo. */
            type $Shape = optimization_guide.proto.ImageInfo.$Properties;
        }

        /**
         * Properties of a SecurityOrigin.
         * @deprecated Use optimization_guide.proto.SecurityOrigin.$Properties instead.
         */
        interface ISecurityOrigin extends optimization_guide.proto.SecurityOrigin.$Properties {
        }

        /** Represents a SecurityOrigin. */
        class SecurityOrigin {

            /**
             * Constructs a new SecurityOrigin.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.SecurityOrigin.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** SecurityOrigin opaque. */
            opaque: boolean;

            /** SecurityOrigin value. */
            value: string;

            /**
             * Creates a new SecurityOrigin instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SecurityOrigin instance
             */
            static create(properties: optimization_guide.proto.SecurityOrigin.$Shape): optimization_guide.proto.SecurityOrigin & optimization_guide.proto.SecurityOrigin.$Shape;
            static create(properties?: optimization_guide.proto.SecurityOrigin.$Properties): optimization_guide.proto.SecurityOrigin;

            /**
             * Encodes the specified SecurityOrigin message. Does not implicitly {@link optimization_guide.proto.SecurityOrigin.verify|verify} messages.
             * @param message SecurityOrigin message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.SecurityOrigin.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SecurityOrigin message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.SecurityOrigin & optimization_guide.proto.SecurityOrigin.$Shape} SecurityOrigin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.SecurityOrigin & optimization_guide.proto.SecurityOrigin.$Shape;

            /**
             * Creates a SecurityOrigin message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SecurityOrigin
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.SecurityOrigin;

            /**
             * Creates a plain object from a SecurityOrigin message. Also converts values to other types if specified.
             * @param message SecurityOrigin
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.SecurityOrigin, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SecurityOrigin to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace SecurityOrigin {

            /** Properties of a SecurityOrigin. */
            interface $Properties {

                /** SecurityOrigin opaque */
                opaque?: (boolean|null);

                /** SecurityOrigin value */
                value?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a SecurityOrigin. */
            type $Shape = optimization_guide.proto.SecurityOrigin.$Properties;
        }

        /**
         * Properties of a SVGRootData.
         * @deprecated Use optimization_guide.proto.SVGRootData.$Properties instead.
         */
        interface ISVGRootData extends optimization_guide.proto.SVGRootData.$Properties {
        }

        /** Represents a SVGRootData. */
        class SVGRootData {

            /**
             * Constructs a new SVGRootData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.SVGRootData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** SVGRootData innerText. */
            innerText: string;

            /**
             * Creates a new SVGRootData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SVGRootData instance
             */
            static create(properties: optimization_guide.proto.SVGRootData.$Shape): optimization_guide.proto.SVGRootData & optimization_guide.proto.SVGRootData.$Shape;
            static create(properties?: optimization_guide.proto.SVGRootData.$Properties): optimization_guide.proto.SVGRootData;

            /**
             * Encodes the specified SVGRootData message. Does not implicitly {@link optimization_guide.proto.SVGRootData.verify|verify} messages.
             * @param message SVGRootData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.SVGRootData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SVGRootData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.SVGRootData & optimization_guide.proto.SVGRootData.$Shape} SVGRootData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.SVGRootData & optimization_guide.proto.SVGRootData.$Shape;

            /**
             * Creates a SVGRootData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SVGRootData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.SVGRootData;

            /**
             * Creates a plain object from a SVGRootData message. Also converts values to other types if specified.
             * @param message SVGRootData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.SVGRootData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SVGRootData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace SVGRootData {

            /** Properties of a SVGRootData. */
            interface $Properties {

                /** SVGRootData innerText */
                innerText?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a SVGRootData. */
            type $Shape = optimization_guide.proto.SVGRootData.$Properties;
        }

        /**
         * Properties of a CanvasData.
         * @deprecated Use optimization_guide.proto.CanvasData.$Properties instead.
         */
        interface ICanvasData extends optimization_guide.proto.CanvasData.$Properties {
        }

        /** Represents a CanvasData. */
        class CanvasData {

            /**
             * Constructs a new CanvasData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.CanvasData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** CanvasData layoutWidth. */
            layoutWidth: number;

            /** CanvasData layoutHeight. */
            layoutHeight: number;

            /**
             * Creates a new CanvasData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CanvasData instance
             */
            static create(properties: optimization_guide.proto.CanvasData.$Shape): optimization_guide.proto.CanvasData & optimization_guide.proto.CanvasData.$Shape;
            static create(properties?: optimization_guide.proto.CanvasData.$Properties): optimization_guide.proto.CanvasData;

            /**
             * Encodes the specified CanvasData message. Does not implicitly {@link optimization_guide.proto.CanvasData.verify|verify} messages.
             * @param message CanvasData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.CanvasData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CanvasData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.CanvasData & optimization_guide.proto.CanvasData.$Shape} CanvasData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.CanvasData & optimization_guide.proto.CanvasData.$Shape;

            /**
             * Creates a CanvasData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CanvasData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.CanvasData;

            /**
             * Creates a plain object from a CanvasData message. Also converts values to other types if specified.
             * @param message CanvasData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.CanvasData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CanvasData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace CanvasData {

            /** Properties of a CanvasData. */
            interface $Properties {

                /** CanvasData layoutWidth */
                layoutWidth?: (number|null);

                /** CanvasData layoutHeight */
                layoutHeight?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a CanvasData. */
            type $Shape = optimization_guide.proto.CanvasData.$Properties;
        }

        /**
         * Properties of a VideoData.
         * @deprecated Use optimization_guide.proto.VideoData.$Properties instead.
         */
        interface IVideoData extends optimization_guide.proto.VideoData.$Properties {
        }

        /** Represents a VideoData. */
        class VideoData {

            /**
             * Constructs a new VideoData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.VideoData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** VideoData url. */
            url: string;

            /** VideoData securityOrigin. */
            securityOrigin?: (optimization_guide.proto.SecurityOrigin.$Properties|null);

            /**
             * Creates a new VideoData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns VideoData instance
             */
            static create(properties: optimization_guide.proto.VideoData.$Shape): optimization_guide.proto.VideoData & optimization_guide.proto.VideoData.$Shape;
            static create(properties?: optimization_guide.proto.VideoData.$Properties): optimization_guide.proto.VideoData;

            /**
             * Encodes the specified VideoData message. Does not implicitly {@link optimization_guide.proto.VideoData.verify|verify} messages.
             * @param message VideoData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.VideoData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VideoData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.VideoData & optimization_guide.proto.VideoData.$Shape} VideoData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.VideoData & optimization_guide.proto.VideoData.$Shape;

            /**
             * Creates a VideoData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VideoData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.VideoData;

            /**
             * Creates a plain object from a VideoData message. Also converts values to other types if specified.
             * @param message VideoData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.VideoData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VideoData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace VideoData {

            /** Properties of a VideoData. */
            interface $Properties {

                /** VideoData url */
                url?: (string|null);

                /** VideoData securityOrigin */
                securityOrigin?: (optimization_guide.proto.SecurityOrigin.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a VideoData. */
            type $Shape = optimization_guide.proto.VideoData.$Properties;
        }

        /**
         * Properties of an AnchorData.
         * @deprecated Use optimization_guide.proto.AnchorData.$Properties instead.
         */
        interface IAnchorData extends optimization_guide.proto.AnchorData.$Properties {
        }

        /** Represents an AnchorData. */
        class AnchorData {

            /**
             * Constructs a new AnchorData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AnchorData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** AnchorData url. */
            url: string;

            /** AnchorData rel. */
            rel: optimization_guide.proto.AnchorRel[];

            /**
             * Creates a new AnchorData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AnchorData instance
             */
            static create(properties: optimization_guide.proto.AnchorData.$Shape): optimization_guide.proto.AnchorData & optimization_guide.proto.AnchorData.$Shape;
            static create(properties?: optimization_guide.proto.AnchorData.$Properties): optimization_guide.proto.AnchorData;

            /**
             * Encodes the specified AnchorData message. Does not implicitly {@link optimization_guide.proto.AnchorData.verify|verify} messages.
             * @param message AnchorData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AnchorData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AnchorData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AnchorData & optimization_guide.proto.AnchorData.$Shape} AnchorData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AnchorData & optimization_guide.proto.AnchorData.$Shape;

            /**
             * Creates an AnchorData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AnchorData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AnchorData;

            /**
             * Creates a plain object from an AnchorData message. Also converts values to other types if specified.
             * @param message AnchorData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AnchorData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AnchorData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AnchorData {

            /** Properties of an AnchorData. */
            interface $Properties {

                /** AnchorData url */
                url?: (string|null);

                /** AnchorData rel */
                rel?: (optimization_guide.proto.AnchorRel[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an AnchorData. */
            type $Shape = optimization_guide.proto.AnchorData.$Properties;
        }

        /**
         * Properties of a FormInfo.
         * @deprecated Use optimization_guide.proto.FormInfo.$Properties instead.
         */
        interface IFormInfo extends optimization_guide.proto.FormInfo.$Properties {
        }

        /** Represents a FormInfo. */
        class FormInfo {

            /**
             * Constructs a new FormInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.FormInfo.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** FormInfo formName. */
            formName: string;

            /** FormInfo actionUrl. */
            actionUrl: string;

            /**
             * Creates a new FormInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FormInfo instance
             */
            static create(properties: optimization_guide.proto.FormInfo.$Shape): optimization_guide.proto.FormInfo & optimization_guide.proto.FormInfo.$Shape;
            static create(properties?: optimization_guide.proto.FormInfo.$Properties): optimization_guide.proto.FormInfo;

            /**
             * Encodes the specified FormInfo message. Does not implicitly {@link optimization_guide.proto.FormInfo.verify|verify} messages.
             * @param message FormInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.FormInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FormInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.FormInfo & optimization_guide.proto.FormInfo.$Shape} FormInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.FormInfo & optimization_guide.proto.FormInfo.$Shape;

            /**
             * Creates a FormInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FormInfo
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.FormInfo;

            /**
             * Creates a plain object from a FormInfo message. Also converts values to other types if specified.
             * @param message FormInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.FormInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FormInfo to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace FormInfo {

            /** Properties of a FormInfo. */
            interface $Properties {

                /** FormInfo formName */
                formName?: (string|null);

                /** FormInfo actionUrl */
                actionUrl?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a FormInfo. */
            type $Shape = optimization_guide.proto.FormInfo.$Properties;
        }

        /**
         * Properties of a FormControlData.
         * @deprecated Use optimization_guide.proto.FormControlData.$Properties instead.
         */
        interface IFormControlData extends optimization_guide.proto.FormControlData.$Properties {
        }

        /** Represents a FormControlData. */
        class FormControlData {

            /**
             * Constructs a new FormControlData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.FormControlData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** FormControlData fieldName. */
            fieldName: string;

            /** FormControlData fieldValue. */
            fieldValue: string;

            /** FormControlData formControlType. */
            formControlType: optimization_guide.proto.FormControlType;

            /** FormControlData selectOptions. */
            selectOptions: optimization_guide.proto.SelectOption.$Properties[];

            /** FormControlData placeholder. */
            placeholder: string;

            /** FormControlData isChecked. */
            isChecked: boolean;

            /** FormControlData isRequired. */
            isRequired: boolean;

            /** FormControlData redactionDecision. */
            redactionDecision: optimization_guide.proto.RedactionDecision;

            /** FormControlData coarseAutofillFieldType. */
            coarseAutofillFieldType: optimization_guide.proto.CoarseAutofillFieldType[];

            /** FormControlData autofillSectionId. */
            autofillSectionId: number;

            /** FormControlData isReadonly. */
            isReadonly: boolean;

            /**
             * Creates a new FormControlData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FormControlData instance
             */
            static create(properties: optimization_guide.proto.FormControlData.$Shape): optimization_guide.proto.FormControlData & optimization_guide.proto.FormControlData.$Shape;
            static create(properties?: optimization_guide.proto.FormControlData.$Properties): optimization_guide.proto.FormControlData;

            /**
             * Encodes the specified FormControlData message. Does not implicitly {@link optimization_guide.proto.FormControlData.verify|verify} messages.
             * @param message FormControlData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.FormControlData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FormControlData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.FormControlData & optimization_guide.proto.FormControlData.$Shape} FormControlData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.FormControlData & optimization_guide.proto.FormControlData.$Shape;

            /**
             * Creates a FormControlData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FormControlData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.FormControlData;

            /**
             * Creates a plain object from a FormControlData message. Also converts values to other types if specified.
             * @param message FormControlData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.FormControlData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FormControlData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace FormControlData {

            /** Properties of a FormControlData. */
            interface $Properties {

                /** FormControlData fieldName */
                fieldName?: (string|null);

                /** FormControlData fieldValue */
                fieldValue?: (string|null);

                /** FormControlData formControlType */
                formControlType?: (optimization_guide.proto.FormControlType|null);

                /** FormControlData selectOptions */
                selectOptions?: (optimization_guide.proto.SelectOption.$Properties[]|null);

                /** FormControlData placeholder */
                placeholder?: (string|null);

                /** FormControlData isChecked */
                isChecked?: (boolean|null);

                /** FormControlData isRequired */
                isRequired?: (boolean|null);

                /** FormControlData redactionDecision */
                redactionDecision?: (optimization_guide.proto.RedactionDecision|null);

                /** FormControlData coarseAutofillFieldType */
                coarseAutofillFieldType?: (optimization_guide.proto.CoarseAutofillFieldType[]|null);

                /** FormControlData autofillSectionId */
                autofillSectionId?: (number|null);

                /** FormControlData isReadonly */
                isReadonly?: (boolean|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a FormControlData. */
            type $Shape = optimization_guide.proto.FormControlData.$Properties;
        }

        /**
         * Properties of a SelectOption.
         * @deprecated Use optimization_guide.proto.SelectOption.$Properties instead.
         */
        interface ISelectOption extends optimization_guide.proto.SelectOption.$Properties {
        }

        /** Represents a SelectOption. */
        class SelectOption {

            /**
             * Constructs a new SelectOption.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.SelectOption.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** SelectOption value. */
            value: string;

            /** SelectOption text. */
            text: string;

            /** SelectOption isSelected. */
            isSelected: boolean;

            /** SelectOption isDisabled. */
            isDisabled: boolean;

            /**
             * Creates a new SelectOption instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SelectOption instance
             */
            static create(properties: optimization_guide.proto.SelectOption.$Shape): optimization_guide.proto.SelectOption & optimization_guide.proto.SelectOption.$Shape;
            static create(properties?: optimization_guide.proto.SelectOption.$Properties): optimization_guide.proto.SelectOption;

            /**
             * Encodes the specified SelectOption message. Does not implicitly {@link optimization_guide.proto.SelectOption.verify|verify} messages.
             * @param message SelectOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.SelectOption.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SelectOption message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.SelectOption & optimization_guide.proto.SelectOption.$Shape} SelectOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.SelectOption & optimization_guide.proto.SelectOption.$Shape;

            /**
             * Creates a SelectOption message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SelectOption
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.SelectOption;

            /**
             * Creates a plain object from a SelectOption message. Also converts values to other types if specified.
             * @param message SelectOption
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.SelectOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SelectOption to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace SelectOption {

            /** Properties of a SelectOption. */
            interface $Properties {

                /** SelectOption value */
                value?: (string|null);

                /** SelectOption text */
                text?: (string|null);

                /** SelectOption isSelected */
                isSelected?: (boolean|null);

                /** SelectOption isDisabled */
                isDisabled?: (boolean|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a SelectOption. */
            type $Shape = optimization_guide.proto.SelectOption.$Properties;
        }

        /**
         * Properties of a TableData.
         * @deprecated Use optimization_guide.proto.TableData.$Properties instead.
         */
        interface ITableData extends optimization_guide.proto.TableData.$Properties {
        }

        /** Represents a TableData. */
        class TableData {

            /**
             * Constructs a new TableData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.TableData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** TableData tableName. */
            tableName: string;

            /**
             * Creates a new TableData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TableData instance
             */
            static create(properties: optimization_guide.proto.TableData.$Shape): optimization_guide.proto.TableData & optimization_guide.proto.TableData.$Shape;
            static create(properties?: optimization_guide.proto.TableData.$Properties): optimization_guide.proto.TableData;

            /**
             * Encodes the specified TableData message. Does not implicitly {@link optimization_guide.proto.TableData.verify|verify} messages.
             * @param message TableData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.TableData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TableData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.TableData & optimization_guide.proto.TableData.$Shape} TableData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.TableData & optimization_guide.proto.TableData.$Shape;

            /**
             * Creates a TableData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TableData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.TableData;

            /**
             * Creates a plain object from a TableData message. Also converts values to other types if specified.
             * @param message TableData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.TableData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TableData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace TableData {

            /** Properties of a TableData. */
            interface $Properties {

                /** TableData tableName */
                tableName?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a TableData. */
            type $Shape = optimization_guide.proto.TableData.$Properties;
        }

        /**
         * Properties of an IframeData.
         * @deprecated Use optimization_guide.proto.IframeData.$Properties instead.
         */
        interface IIframeData extends optimization_guide.proto.IframeData.$Properties {
        }

        /** Represents an IframeData. */
        class IframeData {

            /**
             * Constructs a new IframeData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.IframeData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** IframeData frameData. */
            frameData?: (optimization_guide.proto.FrameData.$Properties|null);

            /** IframeData redactedFrameMetadata. */
            redactedFrameMetadata?: (optimization_guide.proto.IframeData.RedactedFrameMetadata.$Properties|null);

            /** IframeData data. */
            data?: ("frameData"|"redactedFrameMetadata");

            /**
             * Creates a new IframeData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns IframeData instance
             */
            static create(properties: optimization_guide.proto.IframeData.$Shape): optimization_guide.proto.IframeData & optimization_guide.proto.IframeData.$Shape;
            static create(properties?: optimization_guide.proto.IframeData.$Properties): optimization_guide.proto.IframeData;

            /**
             * Encodes the specified IframeData message. Does not implicitly {@link optimization_guide.proto.IframeData.verify|verify} messages.
             * @param message IframeData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.IframeData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an IframeData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.IframeData & optimization_guide.proto.IframeData.$Shape} IframeData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.IframeData & optimization_guide.proto.IframeData.$Shape;

            /**
             * Creates an IframeData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns IframeData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.IframeData;

            /**
             * Creates a plain object from an IframeData message. Also converts values to other types if specified.
             * @param message IframeData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.IframeData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this IframeData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace IframeData {

            /** Properties of an IframeData. */
            interface $Properties {

                /** IframeData frameData */
                frameData?: (optimization_guide.proto.FrameData.$Properties|null);

                /** IframeData redactedFrameMetadata */
                redactedFrameMetadata?: (optimization_guide.proto.IframeData.RedactedFrameMetadata.$Properties|null);

                /** IframeData data */
                data?: ("frameData"|"redactedFrameMetadata");

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Narrowed shape of an IframeData. */
            type $Shape = {
              frameData?: optimization_guide.proto.FrameData.$Shape|null;
              redactedFrameMetadata?: optimization_guide.proto.IframeData.RedactedFrameMetadata.$Shape|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ data?: undefined; frameData?: null; redactedFrameMetadata?: null }|{ data?: "frameData"; frameData: optimization_guide.proto.FrameData.$Shape; redactedFrameMetadata?: null }|{ data?: "redactedFrameMetadata"; frameData?: null; redactedFrameMetadata: optimization_guide.proto.IframeData.RedactedFrameMetadata.$Shape })
            );

            /**
             * Properties of a RedactedFrameMetadata.
             * @deprecated Use optimization_guide.proto.IframeData.RedactedFrameMetadata.$Properties instead.
             */
            interface IRedactedFrameMetadata extends optimization_guide.proto.IframeData.RedactedFrameMetadata.$Properties {
            }

            /** Represents a RedactedFrameMetadata. */
            class RedactedFrameMetadata {

                /**
                 * Constructs a new RedactedFrameMetadata.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: optimization_guide.proto.IframeData.RedactedFrameMetadata.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** RedactedFrameMetadata reason. */
                reason: optimization_guide.proto.IframeData.RedactedFrameMetadata.Reason;

                /**
                 * Creates a new RedactedFrameMetadata instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RedactedFrameMetadata instance
                 */
                static create(properties: optimization_guide.proto.IframeData.RedactedFrameMetadata.$Shape): optimization_guide.proto.IframeData.RedactedFrameMetadata & optimization_guide.proto.IframeData.RedactedFrameMetadata.$Shape;
                static create(properties?: optimization_guide.proto.IframeData.RedactedFrameMetadata.$Properties): optimization_guide.proto.IframeData.RedactedFrameMetadata;

                /**
                 * Encodes the specified RedactedFrameMetadata message. Does not implicitly {@link optimization_guide.proto.IframeData.RedactedFrameMetadata.verify|verify} messages.
                 * @param message RedactedFrameMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: optimization_guide.proto.IframeData.RedactedFrameMetadata.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RedactedFrameMetadata message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {optimization_guide.proto.IframeData.RedactedFrameMetadata & optimization_guide.proto.IframeData.RedactedFrameMetadata.$Shape} RedactedFrameMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.IframeData.RedactedFrameMetadata & optimization_guide.proto.IframeData.RedactedFrameMetadata.$Shape;

                /**
                 * Creates a RedactedFrameMetadata message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RedactedFrameMetadata
                 */
                static fromObject(object: { [k: string]: any }): optimization_guide.proto.IframeData.RedactedFrameMetadata;

                /**
                 * Creates a plain object from a RedactedFrameMetadata message. Also converts values to other types if specified.
                 * @param message RedactedFrameMetadata
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: optimization_guide.proto.IframeData.RedactedFrameMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RedactedFrameMetadata to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };
            }

            namespace RedactedFrameMetadata {

                /** Properties of a RedactedFrameMetadata. */
                interface $Properties {

                    /** RedactedFrameMetadata reason */
                    reason?: (optimization_guide.proto.IframeData.RedactedFrameMetadata.Reason|null);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a RedactedFrameMetadata. */
                type $Shape = optimization_guide.proto.IframeData.RedactedFrameMetadata.$Properties;

                /** Reason enum. */
                enum Reason {

                    /** REASON_UNSPECIFIED value */
                    REASON_UNSPECIFIED = 0,

                    /** REASON_CROSS_SITE value */
                    REASON_CROSS_SITE = 1,

                    /** REASON_CROSS_ORIGIN value */
                    REASON_CROSS_ORIGIN = 2
                }
            }
        }

        /**
         * Properties of a FrameData.
         * @deprecated Use optimization_guide.proto.FrameData.$Properties instead.
         */
        interface IFrameData extends optimization_guide.proto.FrameData.$Properties {
        }

        /** Represents a FrameData. */
        class FrameData {

            /**
             * Constructs a new FrameData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.FrameData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** FrameData securityOrigin. */
            securityOrigin?: (optimization_guide.proto.SecurityOrigin.$Properties|null);

            /** FrameData frameInteractionInfo. */
            frameInteractionInfo?: (optimization_guide.proto.FrameInteractionInfo.$Properties|null);

            /** FrameData documentIdentifier. */
            documentIdentifier?: (optimization_guide.proto.DocumentIdentifier.$Properties|null);

            /** FrameData url. */
            url: string;

            /** FrameData title. */
            title: string;

            /** FrameData paidContentMetadata. */
            paidContentMetadata?: (optimization_guide.proto.PaidContentMetadata.$Properties|null);

            /** FrameData mediaData. */
            mediaData?: (optimization_guide.proto.MediaData.$Properties|null);

            /** FrameData scriptTools. */
            scriptTools: optimization_guide.proto.ScriptTool.$Properties[];

            /** FrameData scriptToolResults. */
            scriptToolResults: optimization_guide.proto.ScriptToolResult.$Properties[];

            /** FrameData defaultLineHeightPx. */
            defaultLineHeightPx: number;

            /**
             * Creates a new FrameData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FrameData instance
             */
            static create(properties: optimization_guide.proto.FrameData.$Shape): optimization_guide.proto.FrameData & optimization_guide.proto.FrameData.$Shape;
            static create(properties?: optimization_guide.proto.FrameData.$Properties): optimization_guide.proto.FrameData;

            /**
             * Encodes the specified FrameData message. Does not implicitly {@link optimization_guide.proto.FrameData.verify|verify} messages.
             * @param message FrameData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.FrameData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FrameData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.FrameData & optimization_guide.proto.FrameData.$Shape} FrameData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.FrameData & optimization_guide.proto.FrameData.$Shape;

            /**
             * Creates a FrameData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FrameData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.FrameData;

            /**
             * Creates a plain object from a FrameData message. Also converts values to other types if specified.
             * @param message FrameData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.FrameData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FrameData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace FrameData {

            /** Properties of a FrameData. */
            interface $Properties {

                /** FrameData securityOrigin */
                securityOrigin?: (optimization_guide.proto.SecurityOrigin.$Properties|null);

                /** FrameData frameInteractionInfo */
                frameInteractionInfo?: (optimization_guide.proto.FrameInteractionInfo.$Properties|null);

                /** FrameData documentIdentifier */
                documentIdentifier?: (optimization_guide.proto.DocumentIdentifier.$Properties|null);

                /** FrameData url */
                url?: (string|null);

                /** FrameData title */
                title?: (string|null);

                /** FrameData paidContentMetadata */
                paidContentMetadata?: (optimization_guide.proto.PaidContentMetadata.$Properties|null);

                /** FrameData mediaData */
                mediaData?: (optimization_guide.proto.MediaData.$Properties|null);

                /** FrameData scriptTools */
                scriptTools?: (optimization_guide.proto.ScriptTool.$Properties[]|null);

                /** FrameData scriptToolResults */
                scriptToolResults?: (optimization_guide.proto.ScriptToolResult.$Properties[]|null);

                /** FrameData defaultLineHeightPx */
                defaultLineHeightPx?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a FrameData. */
            type $Shape = optimization_guide.proto.FrameData.$Properties;
        }

        /**
         * Properties of a FrameInteractionInfo.
         * @deprecated Use optimization_guide.proto.FrameInteractionInfo.$Properties instead.
         */
        interface IFrameInteractionInfo extends optimization_guide.proto.FrameInteractionInfo.$Properties {
        }

        /** Represents a FrameInteractionInfo. */
        class FrameInteractionInfo {

            /**
             * Constructs a new FrameInteractionInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.FrameInteractionInfo.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** FrameInteractionInfo selection. */
            selection?: (optimization_guide.proto.Selection.$Properties|null);

            /** FrameInteractionInfo focusedNodeId. */
            focusedNodeId: number;

            /** FrameInteractionInfo accessibilityFocusedNodeId. */
            accessibilityFocusedNodeId: number;

            /**
             * Creates a new FrameInteractionInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FrameInteractionInfo instance
             */
            static create(properties: optimization_guide.proto.FrameInteractionInfo.$Shape): optimization_guide.proto.FrameInteractionInfo & optimization_guide.proto.FrameInteractionInfo.$Shape;
            static create(properties?: optimization_guide.proto.FrameInteractionInfo.$Properties): optimization_guide.proto.FrameInteractionInfo;

            /**
             * Encodes the specified FrameInteractionInfo message. Does not implicitly {@link optimization_guide.proto.FrameInteractionInfo.verify|verify} messages.
             * @param message FrameInteractionInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.FrameInteractionInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FrameInteractionInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.FrameInteractionInfo & optimization_guide.proto.FrameInteractionInfo.$Shape} FrameInteractionInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.FrameInteractionInfo & optimization_guide.proto.FrameInteractionInfo.$Shape;

            /**
             * Creates a FrameInteractionInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FrameInteractionInfo
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.FrameInteractionInfo;

            /**
             * Creates a plain object from a FrameInteractionInfo message. Also converts values to other types if specified.
             * @param message FrameInteractionInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.FrameInteractionInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FrameInteractionInfo to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace FrameInteractionInfo {

            /** Properties of a FrameInteractionInfo. */
            interface $Properties {

                /** FrameInteractionInfo selection */
                selection?: (optimization_guide.proto.Selection.$Properties|null);

                /** FrameInteractionInfo focusedNodeId */
                focusedNodeId?: (number|null);

                /** FrameInteractionInfo accessibilityFocusedNodeId */
                accessibilityFocusedNodeId?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a FrameInteractionInfo. */
            type $Shape = optimization_guide.proto.FrameInteractionInfo.$Properties;
        }

        /**
         * Properties of a Selection.
         * @deprecated Use optimization_guide.proto.Selection.$Properties instead.
         */
        interface ISelection extends optimization_guide.proto.Selection.$Properties {
        }

        /** Represents a Selection. */
        class Selection {

            /**
             * Constructs a new Selection.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.Selection.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Selection startNodeId. */
            startNodeId: number;

            /** Selection startOffset. */
            startOffset: number;

            /** Selection endNodeId. */
            endNodeId: number;

            /** Selection endOffset. */
            endOffset: number;

            /** Selection selectedText. */
            selectedText: string;

            /**
             * Creates a new Selection instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Selection instance
             */
            static create(properties: optimization_guide.proto.Selection.$Shape): optimization_guide.proto.Selection & optimization_guide.proto.Selection.$Shape;
            static create(properties?: optimization_guide.proto.Selection.$Properties): optimization_guide.proto.Selection;

            /**
             * Encodes the specified Selection message. Does not implicitly {@link optimization_guide.proto.Selection.verify|verify} messages.
             * @param message Selection message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.Selection.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Selection message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.Selection & optimization_guide.proto.Selection.$Shape} Selection
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.Selection & optimization_guide.proto.Selection.$Shape;

            /**
             * Creates a Selection message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Selection
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.Selection;

            /**
             * Creates a plain object from a Selection message. Also converts values to other types if specified.
             * @param message Selection
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.Selection, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Selection to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace Selection {

            /** Properties of a Selection. */
            interface $Properties {

                /** Selection startNodeId */
                startNodeId?: (number|null);

                /** Selection startOffset */
                startOffset?: (number|null);

                /** Selection endNodeId */
                endNodeId?: (number|null);

                /** Selection endOffset */
                endOffset?: (number|null);

                /** Selection selectedText */
                selectedText?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Selection. */
            type $Shape = optimization_guide.proto.Selection.$Properties;
        }

        /**
         * Properties of a DocumentIdentifier.
         * @deprecated Use optimization_guide.proto.DocumentIdentifier.$Properties instead.
         */
        interface IDocumentIdentifier extends optimization_guide.proto.DocumentIdentifier.$Properties {
        }

        /** Represents a DocumentIdentifier. */
        class DocumentIdentifier {

            /**
             * Constructs a new DocumentIdentifier.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.DocumentIdentifier.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** DocumentIdentifier serializedToken. */
            serializedToken: string;

            /**
             * Creates a new DocumentIdentifier instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DocumentIdentifier instance
             */
            static create(properties: optimization_guide.proto.DocumentIdentifier.$Shape): optimization_guide.proto.DocumentIdentifier & optimization_guide.proto.DocumentIdentifier.$Shape;
            static create(properties?: optimization_guide.proto.DocumentIdentifier.$Properties): optimization_guide.proto.DocumentIdentifier;

            /**
             * Encodes the specified DocumentIdentifier message. Does not implicitly {@link optimization_guide.proto.DocumentIdentifier.verify|verify} messages.
             * @param message DocumentIdentifier message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.DocumentIdentifier.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DocumentIdentifier message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.DocumentIdentifier & optimization_guide.proto.DocumentIdentifier.$Shape} DocumentIdentifier
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.DocumentIdentifier & optimization_guide.proto.DocumentIdentifier.$Shape;

            /**
             * Creates a DocumentIdentifier message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DocumentIdentifier
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.DocumentIdentifier;

            /**
             * Creates a plain object from a DocumentIdentifier message. Also converts values to other types if specified.
             * @param message DocumentIdentifier
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.DocumentIdentifier, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DocumentIdentifier to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace DocumentIdentifier {

            /** Properties of a DocumentIdentifier. */
            interface $Properties {

                /** DocumentIdentifier serializedToken */
                serializedToken?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a DocumentIdentifier. */
            type $Shape = optimization_guide.proto.DocumentIdentifier.$Properties;
        }

        /**
         * Properties of a PaidContentMetadata.
         * @deprecated Use optimization_guide.proto.PaidContentMetadata.$Properties instead.
         */
        interface IPaidContentMetadata extends optimization_guide.proto.PaidContentMetadata.$Properties {
        }

        /** Represents a PaidContentMetadata. */
        class PaidContentMetadata {

            /**
             * Constructs a new PaidContentMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.PaidContentMetadata.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** PaidContentMetadata containsPaidContent. */
            containsPaidContent: boolean;

            /**
             * Creates a new PaidContentMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PaidContentMetadata instance
             */
            static create(properties: optimization_guide.proto.PaidContentMetadata.$Shape): optimization_guide.proto.PaidContentMetadata & optimization_guide.proto.PaidContentMetadata.$Shape;
            static create(properties?: optimization_guide.proto.PaidContentMetadata.$Properties): optimization_guide.proto.PaidContentMetadata;

            /**
             * Encodes the specified PaidContentMetadata message. Does not implicitly {@link optimization_guide.proto.PaidContentMetadata.verify|verify} messages.
             * @param message PaidContentMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.PaidContentMetadata.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PaidContentMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.PaidContentMetadata & optimization_guide.proto.PaidContentMetadata.$Shape} PaidContentMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.PaidContentMetadata & optimization_guide.proto.PaidContentMetadata.$Shape;

            /**
             * Creates a PaidContentMetadata message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PaidContentMetadata
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.PaidContentMetadata;

            /**
             * Creates a plain object from a PaidContentMetadata message. Also converts values to other types if specified.
             * @param message PaidContentMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.PaidContentMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PaidContentMetadata to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace PaidContentMetadata {

            /** Properties of a PaidContentMetadata. */
            interface $Properties {

                /** PaidContentMetadata containsPaidContent */
                containsPaidContent?: (boolean|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a PaidContentMetadata. */
            type $Shape = optimization_guide.proto.PaidContentMetadata.$Properties;
        }

        /**
         * Properties of a MediaData.
         * @deprecated Use optimization_guide.proto.MediaData.$Properties instead.
         */
        interface IMediaData extends optimization_guide.proto.MediaData.$Properties {
        }

        /** Represents a MediaData. */
        class MediaData {

            /**
             * Constructs a new MediaData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.MediaData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** MediaData mediaDataType. */
            mediaDataType: optimization_guide.proto.MediaDataType;

            /** MediaData transcripts. */
            transcripts: optimization_guide.proto.MediaTranscript.$Properties[];

            /** MediaData durationMilliseconds. */
            durationMilliseconds: (number|Long);

            /** MediaData currentPositionMilliseconds. */
            currentPositionMilliseconds: (number|Long);

            /** MediaData isPlaying. */
            isPlaying: boolean;

            /** MediaData title. */
            title: string;

            /** MediaData artist. */
            artist: string;

            /** MediaData album. */
            album: string;

            /**
             * Creates a new MediaData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MediaData instance
             */
            static create(properties: optimization_guide.proto.MediaData.$Shape): optimization_guide.proto.MediaData & optimization_guide.proto.MediaData.$Shape;
            static create(properties?: optimization_guide.proto.MediaData.$Properties): optimization_guide.proto.MediaData;

            /**
             * Encodes the specified MediaData message. Does not implicitly {@link optimization_guide.proto.MediaData.verify|verify} messages.
             * @param message MediaData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.MediaData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MediaData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.MediaData & optimization_guide.proto.MediaData.$Shape} MediaData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.MediaData & optimization_guide.proto.MediaData.$Shape;

            /**
             * Creates a MediaData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MediaData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.MediaData;

            /**
             * Creates a plain object from a MediaData message. Also converts values to other types if specified.
             * @param message MediaData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.MediaData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MediaData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace MediaData {

            /** Properties of a MediaData. */
            interface $Properties {

                /** MediaData mediaDataType */
                mediaDataType?: (optimization_guide.proto.MediaDataType|null);

                /** MediaData transcripts */
                transcripts?: (optimization_guide.proto.MediaTranscript.$Properties[]|null);

                /** MediaData durationMilliseconds */
                durationMilliseconds?: (number|Long|null);

                /** MediaData currentPositionMilliseconds */
                currentPositionMilliseconds?: (number|Long|null);

                /** MediaData isPlaying */
                isPlaying?: (boolean|null);

                /** MediaData title */
                title?: (string|null);

                /** MediaData artist */
                artist?: (string|null);

                /** MediaData album */
                album?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a MediaData. */
            type $Shape = optimization_guide.proto.MediaData.$Properties;
        }

        /**
         * Properties of a MediaTranscript.
         * @deprecated Use optimization_guide.proto.MediaTranscript.$Properties instead.
         */
        interface IMediaTranscript extends optimization_guide.proto.MediaTranscript.$Properties {
        }

        /** Represents a MediaTranscript. */
        class MediaTranscript {

            /**
             * Constructs a new MediaTranscript.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.MediaTranscript.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** MediaTranscript text. */
            text: string;

            /** MediaTranscript startTimestampMilliseconds. */
            startTimestampMilliseconds: (number|Long);

            /**
             * Creates a new MediaTranscript instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MediaTranscript instance
             */
            static create(properties: optimization_guide.proto.MediaTranscript.$Shape): optimization_guide.proto.MediaTranscript & optimization_guide.proto.MediaTranscript.$Shape;
            static create(properties?: optimization_guide.proto.MediaTranscript.$Properties): optimization_guide.proto.MediaTranscript;

            /**
             * Encodes the specified MediaTranscript message. Does not implicitly {@link optimization_guide.proto.MediaTranscript.verify|verify} messages.
             * @param message MediaTranscript message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.MediaTranscript.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MediaTranscript message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.MediaTranscript & optimization_guide.proto.MediaTranscript.$Shape} MediaTranscript
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.MediaTranscript & optimization_guide.proto.MediaTranscript.$Shape;

            /**
             * Creates a MediaTranscript message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MediaTranscript
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.MediaTranscript;

            /**
             * Creates a plain object from a MediaTranscript message. Also converts values to other types if specified.
             * @param message MediaTranscript
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.MediaTranscript, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MediaTranscript to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace MediaTranscript {

            /** Properties of a MediaTranscript. */
            interface $Properties {

                /** MediaTranscript text */
                text?: (string|null);

                /** MediaTranscript startTimestampMilliseconds */
                startTimestampMilliseconds?: (number|Long|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a MediaTranscript. */
            type $Shape = optimization_guide.proto.MediaTranscript.$Properties;
        }

        /**
         * Properties of a ScriptTool.
         * @deprecated Use optimization_guide.proto.ScriptTool.$Properties instead.
         */
        interface IScriptTool extends optimization_guide.proto.ScriptTool.$Properties {
        }

        /** Represents a ScriptTool. */
        class ScriptTool {

            /**
             * Constructs a new ScriptTool.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.ScriptTool.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ScriptTool name. */
            name: string;

            /** ScriptTool description. */
            description: string;

            /** ScriptTool inputSchema. */
            inputSchema: string;

            /** ScriptTool annotations. */
            annotations?: (optimization_guide.proto.ScriptToolAnnotations.$Properties|null);

            /**
             * Creates a new ScriptTool instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ScriptTool instance
             */
            static create(properties: optimization_guide.proto.ScriptTool.$Shape): optimization_guide.proto.ScriptTool & optimization_guide.proto.ScriptTool.$Shape;
            static create(properties?: optimization_guide.proto.ScriptTool.$Properties): optimization_guide.proto.ScriptTool;

            /**
             * Encodes the specified ScriptTool message. Does not implicitly {@link optimization_guide.proto.ScriptTool.verify|verify} messages.
             * @param message ScriptTool message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.ScriptTool.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ScriptTool message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.ScriptTool & optimization_guide.proto.ScriptTool.$Shape} ScriptTool
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.ScriptTool & optimization_guide.proto.ScriptTool.$Shape;

            /**
             * Creates a ScriptTool message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ScriptTool
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.ScriptTool;

            /**
             * Creates a plain object from a ScriptTool message. Also converts values to other types if specified.
             * @param message ScriptTool
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.ScriptTool, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ScriptTool to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace ScriptTool {

            /** Properties of a ScriptTool. */
            interface $Properties {

                /** ScriptTool name */
                name?: (string|null);

                /** ScriptTool description */
                description?: (string|null);

                /** ScriptTool inputSchema */
                inputSchema?: (string|null);

                /** ScriptTool annotations */
                annotations?: (optimization_guide.proto.ScriptToolAnnotations.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a ScriptTool. */
            type $Shape = optimization_guide.proto.ScriptTool.$Properties;
        }

        /**
         * Properties of a ScriptToolAnnotations.
         * @deprecated Use optimization_guide.proto.ScriptToolAnnotations.$Properties instead.
         */
        interface IScriptToolAnnotations extends optimization_guide.proto.ScriptToolAnnotations.$Properties {
        }

        /** Represents a ScriptToolAnnotations. */
        class ScriptToolAnnotations {

            /**
             * Constructs a new ScriptToolAnnotations.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.ScriptToolAnnotations.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ScriptToolAnnotations readOnly. */
            readOnly: boolean;

            /**
             * Creates a new ScriptToolAnnotations instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ScriptToolAnnotations instance
             */
            static create(properties: optimization_guide.proto.ScriptToolAnnotations.$Shape): optimization_guide.proto.ScriptToolAnnotations & optimization_guide.proto.ScriptToolAnnotations.$Shape;
            static create(properties?: optimization_guide.proto.ScriptToolAnnotations.$Properties): optimization_guide.proto.ScriptToolAnnotations;

            /**
             * Encodes the specified ScriptToolAnnotations message. Does not implicitly {@link optimization_guide.proto.ScriptToolAnnotations.verify|verify} messages.
             * @param message ScriptToolAnnotations message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.ScriptToolAnnotations.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ScriptToolAnnotations message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.ScriptToolAnnotations & optimization_guide.proto.ScriptToolAnnotations.$Shape} ScriptToolAnnotations
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.ScriptToolAnnotations & optimization_guide.proto.ScriptToolAnnotations.$Shape;

            /**
             * Creates a ScriptToolAnnotations message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ScriptToolAnnotations
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.ScriptToolAnnotations;

            /**
             * Creates a plain object from a ScriptToolAnnotations message. Also converts values to other types if specified.
             * @param message ScriptToolAnnotations
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.ScriptToolAnnotations, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ScriptToolAnnotations to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace ScriptToolAnnotations {

            /** Properties of a ScriptToolAnnotations. */
            interface $Properties {

                /** ScriptToolAnnotations readOnly */
                readOnly?: (boolean|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a ScriptToolAnnotations. */
            type $Shape = optimization_guide.proto.ScriptToolAnnotations.$Properties;
        }

        /**
         * Properties of a ScriptToolResult.
         * @deprecated Use optimization_guide.proto.ScriptToolResult.$Properties instead.
         */
        interface IScriptToolResult extends optimization_guide.proto.ScriptToolResult.$Properties {
        }

        /** Represents a ScriptToolResult. */
        class ScriptToolResult {

            /**
             * Constructs a new ScriptToolResult.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.ScriptToolResult.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ScriptToolResult indexOfScriptToolAction. */
            indexOfScriptToolAction: number;

            /** ScriptToolResult result. */
            result: string;

            /** ScriptToolResult toolName. */
            toolName: string;

            /** ScriptToolResult inputArguments. */
            inputArguments: string;

            /** ScriptToolResult tool. */
            tool?: (optimization_guide.proto.ScriptTool.$Properties|null);

            /**
             * Creates a new ScriptToolResult instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ScriptToolResult instance
             */
            static create(properties: optimization_guide.proto.ScriptToolResult.$Shape): optimization_guide.proto.ScriptToolResult & optimization_guide.proto.ScriptToolResult.$Shape;
            static create(properties?: optimization_guide.proto.ScriptToolResult.$Properties): optimization_guide.proto.ScriptToolResult;

            /**
             * Encodes the specified ScriptToolResult message. Does not implicitly {@link optimization_guide.proto.ScriptToolResult.verify|verify} messages.
             * @param message ScriptToolResult message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.ScriptToolResult.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ScriptToolResult message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.ScriptToolResult & optimization_guide.proto.ScriptToolResult.$Shape} ScriptToolResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.ScriptToolResult & optimization_guide.proto.ScriptToolResult.$Shape;

            /**
             * Creates a ScriptToolResult message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ScriptToolResult
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.ScriptToolResult;

            /**
             * Creates a plain object from a ScriptToolResult message. Also converts values to other types if specified.
             * @param message ScriptToolResult
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.ScriptToolResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ScriptToolResult to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace ScriptToolResult {

            /** Properties of a ScriptToolResult. */
            interface $Properties {

                /** ScriptToolResult indexOfScriptToolAction */
                indexOfScriptToolAction?: (number|null);

                /** ScriptToolResult result */
                result?: (string|null);

                /** ScriptToolResult toolName */
                toolName?: (string|null);

                /** ScriptToolResult inputArguments */
                inputArguments?: (string|null);

                /** ScriptToolResult tool */
                tool?: (optimization_guide.proto.ScriptTool.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a ScriptToolResult. */
            type $Shape = optimization_guide.proto.ScriptToolResult.$Properties;
        }

        /**
         * Properties of a TableRowData.
         * @deprecated Use optimization_guide.proto.TableRowData.$Properties instead.
         */
        interface ITableRowData extends optimization_guide.proto.TableRowData.$Properties {
        }

        /** Represents a TableRowData. */
        class TableRowData {

            /**
             * Constructs a new TableRowData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.TableRowData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** TableRowData type. */
            type: optimization_guide.proto.TableRowType;

            /**
             * Creates a new TableRowData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TableRowData instance
             */
            static create(properties: optimization_guide.proto.TableRowData.$Shape): optimization_guide.proto.TableRowData & optimization_guide.proto.TableRowData.$Shape;
            static create(properties?: optimization_guide.proto.TableRowData.$Properties): optimization_guide.proto.TableRowData;

            /**
             * Encodes the specified TableRowData message. Does not implicitly {@link optimization_guide.proto.TableRowData.verify|verify} messages.
             * @param message TableRowData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.TableRowData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TableRowData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.TableRowData & optimization_guide.proto.TableRowData.$Shape} TableRowData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.TableRowData & optimization_guide.proto.TableRowData.$Shape;

            /**
             * Creates a TableRowData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TableRowData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.TableRowData;

            /**
             * Creates a plain object from a TableRowData message. Also converts values to other types if specified.
             * @param message TableRowData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.TableRowData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TableRowData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace TableRowData {

            /** Properties of a TableRowData. */
            interface $Properties {

                /** TableRowData type */
                type?: (optimization_guide.proto.TableRowType|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a TableRowData. */
            type $Shape = optimization_guide.proto.TableRowData.$Properties;
        }

        /**
         * Properties of a PageInteractionInfo.
         * @deprecated Use optimization_guide.proto.PageInteractionInfo.$Properties instead.
         */
        interface IPageInteractionInfo extends optimization_guide.proto.PageInteractionInfo.$Properties {
        }

        /** Represents a PageInteractionInfo. */
        class PageInteractionInfo {

            /**
             * Constructs a new PageInteractionInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.PageInteractionInfo.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** PageInteractionInfo focusedNodeId. */
            focusedNodeId: number;

            /** PageInteractionInfo accessibilityFocusedNodeId. */
            accessibilityFocusedNodeId: number;

            /** PageInteractionInfo mousePosition. */
            mousePosition?: (optimization_guide.proto.Point.$Properties|null);

            /** PageInteractionInfo focusedFrame. */
            focusedFrame?: (optimization_guide.proto.DocumentIdentifier.$Properties|null);

            /** PageInteractionInfo accessibilityFocusedFrame. */
            accessibilityFocusedFrame?: (optimization_guide.proto.DocumentIdentifier.$Properties|null);

            /**
             * Creates a new PageInteractionInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PageInteractionInfo instance
             */
            static create(properties: optimization_guide.proto.PageInteractionInfo.$Shape): optimization_guide.proto.PageInteractionInfo & optimization_guide.proto.PageInteractionInfo.$Shape;
            static create(properties?: optimization_guide.proto.PageInteractionInfo.$Properties): optimization_guide.proto.PageInteractionInfo;

            /**
             * Encodes the specified PageInteractionInfo message. Does not implicitly {@link optimization_guide.proto.PageInteractionInfo.verify|verify} messages.
             * @param message PageInteractionInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.PageInteractionInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PageInteractionInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.PageInteractionInfo & optimization_guide.proto.PageInteractionInfo.$Shape} PageInteractionInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.PageInteractionInfo & optimization_guide.proto.PageInteractionInfo.$Shape;

            /**
             * Creates a PageInteractionInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PageInteractionInfo
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.PageInteractionInfo;

            /**
             * Creates a plain object from a PageInteractionInfo message. Also converts values to other types if specified.
             * @param message PageInteractionInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.PageInteractionInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PageInteractionInfo to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace PageInteractionInfo {

            /** Properties of a PageInteractionInfo. */
            interface $Properties {

                /** PageInteractionInfo focusedNodeId */
                focusedNodeId?: (number|null);

                /** PageInteractionInfo accessibilityFocusedNodeId */
                accessibilityFocusedNodeId?: (number|null);

                /** PageInteractionInfo mousePosition */
                mousePosition?: (optimization_guide.proto.Point.$Properties|null);

                /** PageInteractionInfo focusedFrame */
                focusedFrame?: (optimization_guide.proto.DocumentIdentifier.$Properties|null);

                /** PageInteractionInfo accessibilityFocusedFrame */
                accessibilityFocusedFrame?: (optimization_guide.proto.DocumentIdentifier.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a PageInteractionInfo. */
            type $Shape = optimization_guide.proto.PageInteractionInfo.$Properties;
        }

        /**
         * Properties of a Point.
         * @deprecated Use optimization_guide.proto.Point.$Properties instead.
         */
        interface IPoint extends optimization_guide.proto.Point.$Properties {
        }

        /** Represents a Point. */
        class Point {

            /**
             * Constructs a new Point.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.Point.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Point x. */
            x: number;

            /** Point y. */
            y: number;

            /**
             * Creates a new Point instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Point instance
             */
            static create(properties: optimization_guide.proto.Point.$Shape): optimization_guide.proto.Point & optimization_guide.proto.Point.$Shape;
            static create(properties?: optimization_guide.proto.Point.$Properties): optimization_guide.proto.Point;

            /**
             * Encodes the specified Point message. Does not implicitly {@link optimization_guide.proto.Point.verify|verify} messages.
             * @param message Point message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.Point.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Point message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.Point & optimization_guide.proto.Point.$Shape} Point
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.Point & optimization_guide.proto.Point.$Shape;

            /**
             * Creates a Point message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Point
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.Point;

            /**
             * Creates a plain object from a Point message. Also converts values to other types if specified.
             * @param message Point
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.Point, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Point to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace Point {

            /** Properties of a Point. */
            interface $Properties {

                /** Point x */
                x?: (number|null);

                /** Point y */
                y?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Point. */
            type $Shape = optimization_guide.proto.Point.$Properties;
        }

        /**
         * Properties of a PopupWindow.
         * @deprecated Use optimization_guide.proto.PopupWindow.$Properties instead.
         */
        interface IPopupWindow extends optimization_guide.proto.PopupWindow.$Properties {
        }

        /** Represents a PopupWindow. */
        class PopupWindow {

            /**
             * Constructs a new PopupWindow.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.PopupWindow.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** PopupWindow rootNode. */
            rootNode?: (optimization_guide.proto.ContentNode.$Properties|null);

            /** PopupWindow visibleBoundingBox. */
            visibleBoundingBox?: (optimization_guide.proto.BoundingRect.$Properties|null);

            /** PopupWindow openerDocumentId. */
            openerDocumentId?: (optimization_guide.proto.DocumentIdentifier.$Properties|null);

            /** PopupWindow openerCommonAncestorDomNodeId. */
            openerCommonAncestorDomNodeId: number;

            /**
             * Creates a new PopupWindow instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PopupWindow instance
             */
            static create(properties: optimization_guide.proto.PopupWindow.$Shape): optimization_guide.proto.PopupWindow & optimization_guide.proto.PopupWindow.$Shape;
            static create(properties?: optimization_guide.proto.PopupWindow.$Properties): optimization_guide.proto.PopupWindow;

            /**
             * Encodes the specified PopupWindow message. Does not implicitly {@link optimization_guide.proto.PopupWindow.verify|verify} messages.
             * @param message PopupWindow message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.PopupWindow.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PopupWindow message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.PopupWindow & optimization_guide.proto.PopupWindow.$Shape} PopupWindow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.PopupWindow & optimization_guide.proto.PopupWindow.$Shape;

            /**
             * Creates a PopupWindow message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PopupWindow
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.PopupWindow;

            /**
             * Creates a plain object from a PopupWindow message. Also converts values to other types if specified.
             * @param message PopupWindow
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.PopupWindow, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PopupWindow to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace PopupWindow {

            /** Properties of a PopupWindow. */
            interface $Properties {

                /** PopupWindow rootNode */
                rootNode?: (optimization_guide.proto.ContentNode.$Properties|null);

                /** PopupWindow visibleBoundingBox */
                visibleBoundingBox?: (optimization_guide.proto.BoundingRect.$Properties|null);

                /** PopupWindow openerDocumentId */
                openerDocumentId?: (optimization_guide.proto.DocumentIdentifier.$Properties|null);

                /** PopupWindow openerCommonAncestorDomNodeId */
                openerCommonAncestorDomNodeId?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a PopupWindow. */
            type $Shape = {
              rootNode?: optimization_guide.proto.ContentNode.$Shape|null;
              visibleBoundingBox?: optimization_guide.proto.BoundingRect.$Shape|null;
              openerDocumentId?: optimization_guide.proto.DocumentIdentifier.$Shape|null;
              openerCommonAncestorDomNodeId?: number|null;
              $unknowns?: Uint8Array[];
            };
        }

        /**
         * Properties of a ProfileInformation.
         * @deprecated Use optimization_guide.proto.ProfileInformation.$Properties instead.
         */
        interface IProfileInformation extends optimization_guide.proto.ProfileInformation.$Properties {
        }

        /** Represents a ProfileInformation. */
        class ProfileInformation {

            /**
             * Constructs a new ProfileInformation.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.ProfileInformation.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ProfileInformation autofillInformation. */
            autofillInformation?: (optimization_guide.proto.AutofillInformation.$Properties|null);

            /**
             * Creates a new ProfileInformation instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ProfileInformation instance
             */
            static create(properties: optimization_guide.proto.ProfileInformation.$Shape): optimization_guide.proto.ProfileInformation & optimization_guide.proto.ProfileInformation.$Shape;
            static create(properties?: optimization_guide.proto.ProfileInformation.$Properties): optimization_guide.proto.ProfileInformation;

            /**
             * Encodes the specified ProfileInformation message. Does not implicitly {@link optimization_guide.proto.ProfileInformation.verify|verify} messages.
             * @param message ProfileInformation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.ProfileInformation.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ProfileInformation message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.ProfileInformation & optimization_guide.proto.ProfileInformation.$Shape} ProfileInformation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.ProfileInformation & optimization_guide.proto.ProfileInformation.$Shape;

            /**
             * Creates a ProfileInformation message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ProfileInformation
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.ProfileInformation;

            /**
             * Creates a plain object from a ProfileInformation message. Also converts values to other types if specified.
             * @param message ProfileInformation
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.ProfileInformation, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ProfileInformation to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace ProfileInformation {

            /** Properties of a ProfileInformation. */
            interface $Properties {

                /** ProfileInformation autofillInformation */
                autofillInformation?: (optimization_guide.proto.AutofillInformation.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a ProfileInformation. */
            type $Shape = optimization_guide.proto.ProfileInformation.$Properties;
        }

        /**
         * Properties of an AutofillInformation.
         * @deprecated Use optimization_guide.proto.AutofillInformation.$Properties instead.
         */
        interface IAutofillInformation extends optimization_guide.proto.AutofillInformation.$Properties {
        }

        /** Represents an AutofillInformation. */
        class AutofillInformation {

            /**
             * Constructs a new AutofillInformation.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AutofillInformation.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** AutofillInformation fillableData. */
            fillableData: optimization_guide.proto.AutofillInformation.FillableData[];

            /**
             * Creates a new AutofillInformation instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AutofillInformation instance
             */
            static create(properties: optimization_guide.proto.AutofillInformation.$Shape): optimization_guide.proto.AutofillInformation & optimization_guide.proto.AutofillInformation.$Shape;
            static create(properties?: optimization_guide.proto.AutofillInformation.$Properties): optimization_guide.proto.AutofillInformation;

            /**
             * Encodes the specified AutofillInformation message. Does not implicitly {@link optimization_guide.proto.AutofillInformation.verify|verify} messages.
             * @param message AutofillInformation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AutofillInformation.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AutofillInformation message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AutofillInformation & optimization_guide.proto.AutofillInformation.$Shape} AutofillInformation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AutofillInformation & optimization_guide.proto.AutofillInformation.$Shape;

            /**
             * Creates an AutofillInformation message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AutofillInformation
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AutofillInformation;

            /**
             * Creates a plain object from an AutofillInformation message. Also converts values to other types if specified.
             * @param message AutofillInformation
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AutofillInformation, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AutofillInformation to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AutofillInformation {

            /** Properties of an AutofillInformation. */
            interface $Properties {

                /** AutofillInformation fillableData */
                fillableData?: (optimization_guide.proto.AutofillInformation.FillableData[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an AutofillInformation. */
            type $Shape = optimization_guide.proto.AutofillInformation.$Properties;

            /** FillableData enum. */
            enum FillableData {

                /** UNSPECIFIED value */
                UNSPECIFIED = 0,

                /** ADDRESS value */
                ADDRESS = 1,

                /** CREDIT_CARD value */
                CREDIT_CARD = 6
            }
        }

        /**
         * Properties of a GeminiInChromePageMetadata.
         * @deprecated Use optimization_guide.proto.GeminiInChromePageMetadata.$Properties instead.
         */
        interface IGeminiInChromePageMetadata extends optimization_guide.proto.GeminiInChromePageMetadata.$Properties {
        }

        /** Represents a GeminiInChromePageMetadata. */
        class GeminiInChromePageMetadata {

            /**
             * Constructs a new GeminiInChromePageMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.GeminiInChromePageMetadata.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** GeminiInChromePageMetadata screenshotInfo. */
            screenshotInfo?: (optimization_guide.proto.ScreenshotInfo.$Properties|null);

            /**
             * Creates a new GeminiInChromePageMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GeminiInChromePageMetadata instance
             */
            static create(properties: optimization_guide.proto.GeminiInChromePageMetadata.$Shape): optimization_guide.proto.GeminiInChromePageMetadata & optimization_guide.proto.GeminiInChromePageMetadata.$Shape;
            static create(properties?: optimization_guide.proto.GeminiInChromePageMetadata.$Properties): optimization_guide.proto.GeminiInChromePageMetadata;

            /**
             * Encodes the specified GeminiInChromePageMetadata message. Does not implicitly {@link optimization_guide.proto.GeminiInChromePageMetadata.verify|verify} messages.
             * @param message GeminiInChromePageMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.GeminiInChromePageMetadata.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GeminiInChromePageMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.GeminiInChromePageMetadata & optimization_guide.proto.GeminiInChromePageMetadata.$Shape} GeminiInChromePageMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.GeminiInChromePageMetadata & optimization_guide.proto.GeminiInChromePageMetadata.$Shape;

            /**
             * Creates a GeminiInChromePageMetadata message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GeminiInChromePageMetadata
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.GeminiInChromePageMetadata;

            /**
             * Creates a plain object from a GeminiInChromePageMetadata message. Also converts values to other types if specified.
             * @param message GeminiInChromePageMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.GeminiInChromePageMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GeminiInChromePageMetadata to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace GeminiInChromePageMetadata {

            /** Properties of a GeminiInChromePageMetadata. */
            interface $Properties {

                /** GeminiInChromePageMetadata screenshotInfo */
                screenshotInfo?: (optimization_guide.proto.ScreenshotInfo.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a GeminiInChromePageMetadata. */
            type $Shape = optimization_guide.proto.GeminiInChromePageMetadata.$Properties;
        }

        /**
         * Properties of a ScreenshotInfo.
         * @deprecated Use optimization_guide.proto.ScreenshotInfo.$Properties instead.
         */
        interface IScreenshotInfo extends optimization_guide.proto.ScreenshotInfo.$Properties {
        }

        /** Represents a ScreenshotInfo. */
        class ScreenshotInfo {

            /**
             * Constructs a new ScreenshotInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.ScreenshotInfo.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ScreenshotInfo hasSelectionRegionInScreenshot. */
            hasSelectionRegionInScreenshot: boolean;

            /** ScreenshotInfo iframeInfo. */
            iframeInfo: optimization_guide.proto.IframeInfo.$Properties[];

            /**
             * Creates a new ScreenshotInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ScreenshotInfo instance
             */
            static create(properties: optimization_guide.proto.ScreenshotInfo.$Shape): optimization_guide.proto.ScreenshotInfo & optimization_guide.proto.ScreenshotInfo.$Shape;
            static create(properties?: optimization_guide.proto.ScreenshotInfo.$Properties): optimization_guide.proto.ScreenshotInfo;

            /**
             * Encodes the specified ScreenshotInfo message. Does not implicitly {@link optimization_guide.proto.ScreenshotInfo.verify|verify} messages.
             * @param message ScreenshotInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.ScreenshotInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ScreenshotInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.ScreenshotInfo & optimization_guide.proto.ScreenshotInfo.$Shape} ScreenshotInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.ScreenshotInfo & optimization_guide.proto.ScreenshotInfo.$Shape;

            /**
             * Creates a ScreenshotInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ScreenshotInfo
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.ScreenshotInfo;

            /**
             * Creates a plain object from a ScreenshotInfo message. Also converts values to other types if specified.
             * @param message ScreenshotInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.ScreenshotInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ScreenshotInfo to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace ScreenshotInfo {

            /** Properties of a ScreenshotInfo. */
            interface $Properties {

                /** ScreenshotInfo hasSelectionRegionInScreenshot */
                hasSelectionRegionInScreenshot?: (boolean|null);

                /** ScreenshotInfo iframeInfo */
                iframeInfo?: (optimization_guide.proto.IframeInfo.$Properties[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a ScreenshotInfo. */
            type $Shape = optimization_guide.proto.ScreenshotInfo.$Properties;
        }

        /**
         * Properties of an IframeInfo.
         * @deprecated Use optimization_guide.proto.IframeInfo.$Properties instead.
         */
        interface IIframeInfo extends optimization_guide.proto.IframeInfo.$Properties {
        }

        /** Represents an IframeInfo. */
        class IframeInfo {

            /**
             * Constructs a new IframeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.IframeInfo.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** IframeInfo securityOrigin. */
            securityOrigin?: (optimization_guide.proto.SecurityOrigin.$Properties|null);

            /** IframeInfo url. */
            url: string;

            /** IframeInfo boundingBox. */
            boundingBox?: (optimization_guide.proto.BoundingRect.$Properties|null);

            /**
             * Creates a new IframeInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns IframeInfo instance
             */
            static create(properties: optimization_guide.proto.IframeInfo.$Shape): optimization_guide.proto.IframeInfo & optimization_guide.proto.IframeInfo.$Shape;
            static create(properties?: optimization_guide.proto.IframeInfo.$Properties): optimization_guide.proto.IframeInfo;

            /**
             * Encodes the specified IframeInfo message. Does not implicitly {@link optimization_guide.proto.IframeInfo.verify|verify} messages.
             * @param message IframeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.IframeInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an IframeInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.IframeInfo & optimization_guide.proto.IframeInfo.$Shape} IframeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.IframeInfo & optimization_guide.proto.IframeInfo.$Shape;

            /**
             * Creates an IframeInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns IframeInfo
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.IframeInfo;

            /**
             * Creates a plain object from an IframeInfo message. Also converts values to other types if specified.
             * @param message IframeInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.IframeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this IframeInfo to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace IframeInfo {

            /** Properties of an IframeInfo. */
            interface $Properties {

                /** IframeInfo securityOrigin */
                securityOrigin?: (optimization_guide.proto.SecurityOrigin.$Properties|null);

                /** IframeInfo url */
                url?: (string|null);

                /** IframeInfo boundingBox */
                boundingBox?: (optimization_guide.proto.BoundingRect.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an IframeInfo. */
            type $Shape = optimization_guide.proto.IframeInfo.$Properties;
        }

        /**
         * Properties of an AutofillGlobalId.
         * @deprecated Use optimization_guide.proto.AutofillGlobalId.$Properties instead.
         */
        interface IAutofillGlobalId extends optimization_guide.proto.AutofillGlobalId.$Properties {
        }

        /** Represents an AutofillGlobalId. */
        class AutofillGlobalId {

            /**
             * Constructs a new AutofillGlobalId.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AutofillGlobalId.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** AutofillGlobalId frameToken. */
            frameToken: string;

            /** AutofillGlobalId rendererId. */
            rendererId: (number|Long);

            /**
             * Creates a new AutofillGlobalId instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AutofillGlobalId instance
             */
            static create(properties: optimization_guide.proto.AutofillGlobalId.$Shape): optimization_guide.proto.AutofillGlobalId & optimization_guide.proto.AutofillGlobalId.$Shape;
            static create(properties?: optimization_guide.proto.AutofillGlobalId.$Properties): optimization_guide.proto.AutofillGlobalId;

            /**
             * Encodes the specified AutofillGlobalId message. Does not implicitly {@link optimization_guide.proto.AutofillGlobalId.verify|verify} messages.
             * @param message AutofillGlobalId message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AutofillGlobalId.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AutofillGlobalId message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AutofillGlobalId & optimization_guide.proto.AutofillGlobalId.$Shape} AutofillGlobalId
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AutofillGlobalId & optimization_guide.proto.AutofillGlobalId.$Shape;

            /**
             * Creates an AutofillGlobalId message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AutofillGlobalId
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AutofillGlobalId;

            /**
             * Creates a plain object from an AutofillGlobalId message. Also converts values to other types if specified.
             * @param message AutofillGlobalId
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AutofillGlobalId, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AutofillGlobalId to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AutofillGlobalId {

            /** Properties of an AutofillGlobalId. */
            interface $Properties {

                /** AutofillGlobalId frameToken */
                frameToken?: (string|null);

                /** AutofillGlobalId rendererId */
                rendererId?: (number|Long|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an AutofillGlobalId. */
            type $Shape = optimization_guide.proto.AutofillGlobalId.$Properties;
        }

        /**
         * Properties of a FormData.
         * @deprecated Use optimization_guide.proto.FormData.$Properties instead.
         */
        interface IFormData extends optimization_guide.proto.FormData.$Properties {
        }

        /** Represents a FormData. */
        class FormData {

            /**
             * Constructs a new FormData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.FormData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** FormData formName. */
            formName: string;

            /** FormData fields. */
            fields: optimization_guide.proto.FormFieldData.$Properties[];

            /** FormData globalId. */
            globalId?: (optimization_guide.proto.AutofillGlobalId.$Properties|null);

            /** FormData formSignature. */
            formSignature: (number|Long);

            /** FormData actionUrl. */
            actionUrl: string;

            /**
             * Creates a new FormData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FormData instance
             */
            static create(properties: optimization_guide.proto.FormData.$Shape): optimization_guide.proto.FormData & optimization_guide.proto.FormData.$Shape;
            static create(properties?: optimization_guide.proto.FormData.$Properties): optimization_guide.proto.FormData;

            /**
             * Encodes the specified FormData message. Does not implicitly {@link optimization_guide.proto.FormData.verify|verify} messages.
             * @param message FormData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.FormData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FormData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.FormData & optimization_guide.proto.FormData.$Shape} FormData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.FormData & optimization_guide.proto.FormData.$Shape;

            /**
             * Creates a FormData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FormData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.FormData;

            /**
             * Creates a plain object from a FormData message. Also converts values to other types if specified.
             * @param message FormData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.FormData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FormData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace FormData {

            /** Properties of a FormData. */
            interface $Properties {

                /** FormData formName */
                formName?: (string|null);

                /** FormData fields */
                fields?: (optimization_guide.proto.FormFieldData.$Properties[]|null);

                /** FormData globalId */
                globalId?: (optimization_guide.proto.AutofillGlobalId.$Properties|null);

                /** FormData formSignature */
                formSignature?: (number|Long|null);

                /** FormData actionUrl */
                actionUrl?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a FormData. */
            type $Shape = optimization_guide.proto.FormData.$Properties;
        }

        /**
         * Properties of a FormFieldData.
         * @deprecated Use optimization_guide.proto.FormFieldData.$Properties instead.
         */
        interface IFormFieldData extends optimization_guide.proto.FormFieldData.$Properties {
        }

        /** Represents a FormFieldData. */
        class FormFieldData {

            /**
             * Constructs a new FormFieldData.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.FormFieldData.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** FormFieldData fieldName. */
            fieldName: string;

            /** FormFieldData fieldLabel. */
            fieldLabel: string;

            /** FormFieldData fieldValue. */
            fieldValue: string;

            /** FormFieldData isVisible. */
            isVisible: boolean;

            /** FormFieldData isFocusable. */
            isFocusable: boolean;

            /** FormFieldData formControlType. */
            formControlType: optimization_guide.proto.FormControlType;

            /** FormFieldData selectOptions. */
            selectOptions: optimization_guide.proto.SelectOption.$Properties[];

            /** FormFieldData placeholder. */
            placeholder: string;

            /** FormFieldData formControlAxNodeId. */
            formControlAxNodeId: number;

            /** FormFieldData isEligible. */
            isEligible: boolean;

            /** FormFieldData globalId. */
            globalId?: (optimization_guide.proto.AutofillGlobalId.$Properties|null);

            /** FormFieldData fieldSignature. */
            fieldSignature: number;

            /** FormFieldData ariaLabel. */
            ariaLabel: string;

            /** FormFieldData ariaDescription. */
            ariaDescription: string;

            /**
             * Creates a new FormFieldData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FormFieldData instance
             */
            static create(properties: optimization_guide.proto.FormFieldData.$Shape): optimization_guide.proto.FormFieldData & optimization_guide.proto.FormFieldData.$Shape;
            static create(properties?: optimization_guide.proto.FormFieldData.$Properties): optimization_guide.proto.FormFieldData;

            /**
             * Encodes the specified FormFieldData message. Does not implicitly {@link optimization_guide.proto.FormFieldData.verify|verify} messages.
             * @param message FormFieldData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.FormFieldData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FormFieldData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.FormFieldData & optimization_guide.proto.FormFieldData.$Shape} FormFieldData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.FormFieldData & optimization_guide.proto.FormFieldData.$Shape;

            /**
             * Creates a FormFieldData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FormFieldData
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.FormFieldData;

            /**
             * Creates a plain object from a FormFieldData message. Also converts values to other types if specified.
             * @param message FormFieldData
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.FormFieldData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FormFieldData to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace FormFieldData {

            /** Properties of a FormFieldData. */
            interface $Properties {

                /** FormFieldData fieldName */
                fieldName?: (string|null);

                /** FormFieldData fieldLabel */
                fieldLabel?: (string|null);

                /** FormFieldData fieldValue */
                fieldValue?: (string|null);

                /** FormFieldData isVisible */
                isVisible?: (boolean|null);

                /** FormFieldData isFocusable */
                isFocusable?: (boolean|null);

                /** FormFieldData formControlType */
                formControlType?: (optimization_guide.proto.FormControlType|null);

                /** FormFieldData selectOptions */
                selectOptions?: (optimization_guide.proto.SelectOption.$Properties[]|null);

                /** FormFieldData placeholder */
                placeholder?: (string|null);

                /** FormFieldData formControlAxNodeId */
                formControlAxNodeId?: (number|null);

                /** FormFieldData isEligible */
                isEligible?: (boolean|null);

                /** FormFieldData globalId */
                globalId?: (optimization_guide.proto.AutofillGlobalId.$Properties|null);

                /** FormFieldData fieldSignature */
                fieldSignature?: (number|null);

                /** FormFieldData ariaLabel */
                ariaLabel?: (string|null);

                /** FormFieldData ariaDescription */
                ariaDescription?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a FormFieldData. */
            type $Shape = optimization_guide.proto.FormFieldData.$Properties;
        }

        /**
         * Properties of a TableRow.
         * @deprecated Use optimization_guide.proto.TableRow.$Properties instead.
         */
        interface ITableRow extends optimization_guide.proto.TableRow.$Properties {
        }

        /** Represents a TableRow. */
        class TableRow {

            /**
             * Constructs a new TableRow.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.TableRow.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** TableRow cells. */
            cells: optimization_guide.proto.ContentNode.$Properties[];

            /**
             * Creates a new TableRow instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TableRow instance
             */
            static create(properties: optimization_guide.proto.TableRow.$Shape): optimization_guide.proto.TableRow & optimization_guide.proto.TableRow.$Shape;
            static create(properties?: optimization_guide.proto.TableRow.$Properties): optimization_guide.proto.TableRow;

            /**
             * Encodes the specified TableRow message. Does not implicitly {@link optimization_guide.proto.TableRow.verify|verify} messages.
             * @param message TableRow message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.TableRow.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TableRow message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.TableRow & optimization_guide.proto.TableRow.$Shape} TableRow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.TableRow & optimization_guide.proto.TableRow.$Shape;

            /**
             * Creates a TableRow message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TableRow
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.TableRow;

            /**
             * Creates a plain object from a TableRow message. Also converts values to other types if specified.
             * @param message TableRow
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.TableRow, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TableRow to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace TableRow {

            /** Properties of a TableRow. */
            interface $Properties {

                /** TableRow cells */
                cells?: (optimization_guide.proto.ContentNode.$Properties[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a TableRow. */
            type $Shape = {
              cells?: optimization_guide.proto.ContentNode.$Shape[]|null;
              $unknowns?: Uint8Array[];
            };
        }

        /**
         * Properties of a TabGroup.
         * @deprecated Use optimization_guide.proto.TabGroup.$Properties instead.
         */
        interface ITabGroup extends optimization_guide.proto.TabGroup.$Properties {
        }

        /** Represents a TabGroup. */
        class TabGroup {

            /**
             * Constructs a new TabGroup.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.TabGroup.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** TabGroup label. */
            label: string;

            /** TabGroup tabs. */
            tabs: optimization_guide.proto.Tab.$Properties[];

            /** TabGroup groupId. */
            groupId: string;

            /**
             * Creates a new TabGroup instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TabGroup instance
             */
            static create(properties: optimization_guide.proto.TabGroup.$Shape): optimization_guide.proto.TabGroup & optimization_guide.proto.TabGroup.$Shape;
            static create(properties?: optimization_guide.proto.TabGroup.$Properties): optimization_guide.proto.TabGroup;

            /**
             * Encodes the specified TabGroup message. Does not implicitly {@link optimization_guide.proto.TabGroup.verify|verify} messages.
             * @param message TabGroup message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.TabGroup.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TabGroup message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.TabGroup & optimization_guide.proto.TabGroup.$Shape} TabGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.TabGroup & optimization_guide.proto.TabGroup.$Shape;

            /**
             * Creates a TabGroup message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TabGroup
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.TabGroup;

            /**
             * Creates a plain object from a TabGroup message. Also converts values to other types if specified.
             * @param message TabGroup
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.TabGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TabGroup to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace TabGroup {

            /** Properties of a TabGroup. */
            interface $Properties {

                /** TabGroup label */
                label?: (string|null);

                /** TabGroup tabs */
                tabs?: (optimization_guide.proto.Tab.$Properties[]|null);

                /** TabGroup groupId */
                groupId?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a TabGroup. */
            type $Shape = {
              label?: string|null;
              tabs?: optimization_guide.proto.Tab.$Shape[]|null;
              groupId?: string|null;
              $unknowns?: Uint8Array[];
            };
        }

        /**
         * Properties of a Tab.
         * @deprecated Use optimization_guide.proto.Tab.$Properties instead.
         */
        interface ITab extends optimization_guide.proto.Tab.$Properties {
        }

        /** Represents a Tab. */
        class Tab {

            /**
             * Constructs a new Tab.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.Tab.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Tab tabId. */
            tabId: (number|Long);

            /** Tab title. */
            title: string;

            /** Tab url. */
            url: string;

            /** Tab pageContext. */
            pageContext?: (optimization_guide.proto.PageContext.$Properties|null);

            /**
             * Creates a new Tab instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Tab instance
             */
            static create(properties: optimization_guide.proto.Tab.$Shape): optimization_guide.proto.Tab & optimization_guide.proto.Tab.$Shape;
            static create(properties?: optimization_guide.proto.Tab.$Properties): optimization_guide.proto.Tab;

            /**
             * Encodes the specified Tab message. Does not implicitly {@link optimization_guide.proto.Tab.verify|verify} messages.
             * @param message Tab message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.Tab.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Tab message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.Tab & optimization_guide.proto.Tab.$Shape} Tab
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.Tab & optimization_guide.proto.Tab.$Shape;

            /**
             * Creates a Tab message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Tab
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.Tab;

            /**
             * Creates a plain object from a Tab message. Also converts values to other types if specified.
             * @param message Tab
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.Tab, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Tab to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace Tab {

            /** Properties of a Tab. */
            interface $Properties {

                /** Tab tabId */
                tabId?: (number|Long|null);

                /** Tab title */
                title?: (string|null);

                /** Tab url */
                url?: (string|null);

                /** Tab pageContext */
                pageContext?: (optimization_guide.proto.PageContext.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Tab. */
            type $Shape = {
              tabId?: number|Long|null;
              title?: string|null;
              url?: string|null;
              pageContext?: optimization_guide.proto.PageContext.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        /**
         * Properties of a SiteEngagementEntry.
         * @deprecated Use optimization_guide.proto.SiteEngagementEntry.$Properties instead.
         */
        interface ISiteEngagementEntry extends optimization_guide.proto.SiteEngagementEntry.$Properties {
        }

        /** Represents a SiteEngagementEntry. */
        class SiteEngagementEntry {

            /**
             * Constructs a new SiteEngagementEntry.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.SiteEngagementEntry.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** SiteEngagementEntry url. */
            url: string;

            /** SiteEngagementEntry score. */
            score: number;

            /**
             * Creates a new SiteEngagementEntry instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SiteEngagementEntry instance
             */
            static create(properties: optimization_guide.proto.SiteEngagementEntry.$Shape): optimization_guide.proto.SiteEngagementEntry & optimization_guide.proto.SiteEngagementEntry.$Shape;
            static create(properties?: optimization_guide.proto.SiteEngagementEntry.$Properties): optimization_guide.proto.SiteEngagementEntry;

            /**
             * Encodes the specified SiteEngagementEntry message. Does not implicitly {@link optimization_guide.proto.SiteEngagementEntry.verify|verify} messages.
             * @param message SiteEngagementEntry message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.SiteEngagementEntry.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SiteEngagementEntry message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.SiteEngagementEntry & optimization_guide.proto.SiteEngagementEntry.$Shape} SiteEngagementEntry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.SiteEngagementEntry & optimization_guide.proto.SiteEngagementEntry.$Shape;

            /**
             * Creates a SiteEngagementEntry message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SiteEngagementEntry
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.SiteEngagementEntry;

            /**
             * Creates a plain object from a SiteEngagementEntry message. Also converts values to other types if specified.
             * @param message SiteEngagementEntry
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.SiteEngagementEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SiteEngagementEntry to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace SiteEngagementEntry {

            /** Properties of a SiteEngagementEntry. */
            interface $Properties {

                /** SiteEngagementEntry url */
                url?: (string|null);

                /** SiteEngagementEntry score */
                score?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a SiteEngagementEntry. */
            type $Shape = optimization_guide.proto.SiteEngagementEntry.$Properties;
        }

        /**
         * Properties of a SiteEngagement.
         * @deprecated Use optimization_guide.proto.SiteEngagement.$Properties instead.
         */
        interface ISiteEngagement extends optimization_guide.proto.SiteEngagement.$Properties {
        }

        /** Represents a SiteEngagement. */
        class SiteEngagement {

            /**
             * Constructs a new SiteEngagement.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.SiteEngagement.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** SiteEngagement entries. */
            entries: optimization_guide.proto.SiteEngagementEntry.$Properties[];

            /**
             * Creates a new SiteEngagement instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SiteEngagement instance
             */
            static create(properties: optimization_guide.proto.SiteEngagement.$Shape): optimization_guide.proto.SiteEngagement & optimization_guide.proto.SiteEngagement.$Shape;
            static create(properties?: optimization_guide.proto.SiteEngagement.$Properties): optimization_guide.proto.SiteEngagement;

            /**
             * Encodes the specified SiteEngagement message. Does not implicitly {@link optimization_guide.proto.SiteEngagement.verify|verify} messages.
             * @param message SiteEngagement message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.SiteEngagement.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SiteEngagement message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.SiteEngagement & optimization_guide.proto.SiteEngagement.$Shape} SiteEngagement
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.SiteEngagement & optimization_guide.proto.SiteEngagement.$Shape;

            /**
             * Creates a SiteEngagement message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SiteEngagement
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.SiteEngagement;

            /**
             * Creates a plain object from a SiteEngagement message. Also converts values to other types if specified.
             * @param message SiteEngagement
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.SiteEngagement, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SiteEngagement to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace SiteEngagement {

            /** Properties of a SiteEngagement. */
            interface $Properties {

                /** SiteEngagement entries */
                entries?: (optimization_guide.proto.SiteEngagementEntry.$Properties[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a SiteEngagement. */
            type $Shape = optimization_guide.proto.SiteEngagement.$Properties;
        }

        /**
         * Properties of a Coordinate.
         * @deprecated Use optimization_guide.proto.Coordinate.$Properties instead.
         */
        interface ICoordinate extends optimization_guide.proto.Coordinate.$Properties {
        }

        /** Represents a Coordinate. */
        class Coordinate {

            /**
             * Constructs a new Coordinate.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.Coordinate.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Coordinate x. */
            x: number;

            /** Coordinate y. */
            y: number;

            /** Coordinate pixelType. */
            pixelType: optimization_guide.proto.Coordinate.PixelType;

            /**
             * Creates a new Coordinate instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Coordinate instance
             */
            static create(properties: optimization_guide.proto.Coordinate.$Shape): optimization_guide.proto.Coordinate & optimization_guide.proto.Coordinate.$Shape;
            static create(properties?: optimization_guide.proto.Coordinate.$Properties): optimization_guide.proto.Coordinate;

            /**
             * Encodes the specified Coordinate message. Does not implicitly {@link optimization_guide.proto.Coordinate.verify|verify} messages.
             * @param message Coordinate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.Coordinate.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Coordinate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.Coordinate & optimization_guide.proto.Coordinate.$Shape} Coordinate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.Coordinate & optimization_guide.proto.Coordinate.$Shape;

            /**
             * Creates a Coordinate message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Coordinate
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.Coordinate;

            /**
             * Creates a plain object from a Coordinate message. Also converts values to other types if specified.
             * @param message Coordinate
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.Coordinate, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Coordinate to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace Coordinate {

            /** Properties of a Coordinate. */
            interface $Properties {

                /** Coordinate x */
                x?: (number|null);

                /** Coordinate y */
                y?: (number|null);

                /** Coordinate pixelType */
                pixelType?: (optimization_guide.proto.Coordinate.PixelType|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Coordinate. */
            type $Shape = optimization_guide.proto.Coordinate.$Properties;

            /** PixelType enum. */
            enum PixelType {

                /** PIXEL_TYPE_UNSPECIFIED value */
                PIXEL_TYPE_UNSPECIFIED = 0,

                /** PIXEL_TYPE_DIPS value */
                PIXEL_TYPE_DIPS = 1,

                /** PIXEL_TYPE_PHYSICAL_PIXELS value */
                PIXEL_TYPE_PHYSICAL_PIXELS = 2
            }
        }

        /**
         * Properties of a MetaTag.
         * @deprecated Use optimization_guide.proto.MetaTag.$Properties instead.
         */
        interface IMetaTag extends optimization_guide.proto.MetaTag.$Properties {
        }

        /** Represents a MetaTag. */
        class MetaTag {

            /**
             * Constructs a new MetaTag.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.MetaTag.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** MetaTag name. */
            name: string;

            /** MetaTag content. */
            content: string;

            /**
             * Creates a new MetaTag instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MetaTag instance
             */
            static create(properties: optimization_guide.proto.MetaTag.$Shape): optimization_guide.proto.MetaTag & optimization_guide.proto.MetaTag.$Shape;
            static create(properties?: optimization_guide.proto.MetaTag.$Properties): optimization_guide.proto.MetaTag;

            /**
             * Encodes the specified MetaTag message. Does not implicitly {@link optimization_guide.proto.MetaTag.verify|verify} messages.
             * @param message MetaTag message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.MetaTag.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MetaTag message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.MetaTag & optimization_guide.proto.MetaTag.$Shape} MetaTag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.MetaTag & optimization_guide.proto.MetaTag.$Shape;

            /**
             * Creates a MetaTag message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MetaTag
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.MetaTag;

            /**
             * Creates a plain object from a MetaTag message. Also converts values to other types if specified.
             * @param message MetaTag
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.MetaTag, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MetaTag to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace MetaTag {

            /** Properties of a MetaTag. */
            interface $Properties {

                /** MetaTag name */
                name?: (string|null);

                /** MetaTag content */
                content?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a MetaTag. */
            type $Shape = optimization_guide.proto.MetaTag.$Properties;
        }

        /**
         * Properties of a FrameMetadata.
         * @deprecated Use optimization_guide.proto.FrameMetadata.$Properties instead.
         */
        interface IFrameMetadata extends optimization_guide.proto.FrameMetadata.$Properties {
        }

        /** Represents a FrameMetadata. */
        class FrameMetadata {

            /**
             * Constructs a new FrameMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.FrameMetadata.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** FrameMetadata url. */
            url: string;

            /** FrameMetadata metaTags. */
            metaTags: optimization_guide.proto.MetaTag.$Properties[];

            /** FrameMetadata hasMediaTranscripts. */
            hasMediaTranscripts: boolean;

            /**
             * Creates a new FrameMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FrameMetadata instance
             */
            static create(properties: optimization_guide.proto.FrameMetadata.$Shape): optimization_guide.proto.FrameMetadata & optimization_guide.proto.FrameMetadata.$Shape;
            static create(properties?: optimization_guide.proto.FrameMetadata.$Properties): optimization_guide.proto.FrameMetadata;

            /**
             * Encodes the specified FrameMetadata message. Does not implicitly {@link optimization_guide.proto.FrameMetadata.verify|verify} messages.
             * @param message FrameMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.FrameMetadata.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FrameMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.FrameMetadata & optimization_guide.proto.FrameMetadata.$Shape} FrameMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.FrameMetadata & optimization_guide.proto.FrameMetadata.$Shape;

            /**
             * Creates a FrameMetadata message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FrameMetadata
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.FrameMetadata;

            /**
             * Creates a plain object from a FrameMetadata message. Also converts values to other types if specified.
             * @param message FrameMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.FrameMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FrameMetadata to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace FrameMetadata {

            /** Properties of a FrameMetadata. */
            interface $Properties {

                /** FrameMetadata url */
                url?: (string|null);

                /** FrameMetadata metaTags */
                metaTags?: (optimization_guide.proto.MetaTag.$Properties[]|null);

                /** FrameMetadata hasMediaTranscripts */
                hasMediaTranscripts?: (boolean|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a FrameMetadata. */
            type $Shape = optimization_guide.proto.FrameMetadata.$Properties;
        }

        /**
         * Properties of a PageMetadata.
         * @deprecated Use optimization_guide.proto.PageMetadata.$Properties instead.
         */
        interface IPageMetadata extends optimization_guide.proto.PageMetadata.$Properties {
        }

        /** Represents a PageMetadata. */
        class PageMetadata {

            /**
             * Constructs a new PageMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.PageMetadata.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** PageMetadata frameMetadata. */
            frameMetadata: optimization_guide.proto.FrameMetadata.$Properties[];

            /**
             * Creates a new PageMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PageMetadata instance
             */
            static create(properties: optimization_guide.proto.PageMetadata.$Shape): optimization_guide.proto.PageMetadata & optimization_guide.proto.PageMetadata.$Shape;
            static create(properties?: optimization_guide.proto.PageMetadata.$Properties): optimization_guide.proto.PageMetadata;

            /**
             * Encodes the specified PageMetadata message. Does not implicitly {@link optimization_guide.proto.PageMetadata.verify|verify} messages.
             * @param message PageMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.PageMetadata.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PageMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.PageMetadata & optimization_guide.proto.PageMetadata.$Shape} PageMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.PageMetadata & optimization_guide.proto.PageMetadata.$Shape;

            /**
             * Creates a PageMetadata message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PageMetadata
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.PageMetadata;

            /**
             * Creates a plain object from a PageMetadata message. Also converts values to other types if specified.
             * @param message PageMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.PageMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PageMetadata to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace PageMetadata {

            /** Properties of a PageMetadata. */
            interface $Properties {

                /** PageMetadata frameMetadata */
                frameMetadata?: (optimization_guide.proto.FrameMetadata.$Properties[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a PageMetadata. */
            type $Shape = optimization_guide.proto.PageMetadata.$Properties;
        }

        /**
         * Properties of a DocumentSelection.
         * @deprecated Use optimization_guide.proto.DocumentSelection.$Properties instead.
         */
        interface IDocumentSelection extends optimization_guide.proto.DocumentSelection.$Properties {
        }

        /** Represents a DocumentSelection. */
        class DocumentSelection {

            /**
             * Constructs a new DocumentSelection.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.DocumentSelection.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** DocumentSelection documentIdentifier. */
            documentIdentifier?: (optimization_guide.proto.DocumentIdentifier.$Properties|null);

            /** DocumentSelection selection. */
            selection?: (optimization_guide.proto.Selection.$Properties|null);

            /**
             * Creates a new DocumentSelection instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DocumentSelection instance
             */
            static create(properties: optimization_guide.proto.DocumentSelection.$Shape): optimization_guide.proto.DocumentSelection & optimization_guide.proto.DocumentSelection.$Shape;
            static create(properties?: optimization_guide.proto.DocumentSelection.$Properties): optimization_guide.proto.DocumentSelection;

            /**
             * Encodes the specified DocumentSelection message. Does not implicitly {@link optimization_guide.proto.DocumentSelection.verify|verify} messages.
             * @param message DocumentSelection message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.DocumentSelection.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DocumentSelection message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.DocumentSelection & optimization_guide.proto.DocumentSelection.$Shape} DocumentSelection
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.DocumentSelection & optimization_guide.proto.DocumentSelection.$Shape;

            /**
             * Creates a DocumentSelection message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DocumentSelection
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.DocumentSelection;

            /**
             * Creates a plain object from a DocumentSelection message. Also converts values to other types if specified.
             * @param message DocumentSelection
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.DocumentSelection, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DocumentSelection to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace DocumentSelection {

            /** Properties of a DocumentSelection. */
            interface $Properties {

                /** DocumentSelection documentIdentifier */
                documentIdentifier?: (optimization_guide.proto.DocumentIdentifier.$Properties|null);

                /** DocumentSelection selection */
                selection?: (optimization_guide.proto.Selection.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a DocumentSelection. */
            type $Shape = optimization_guide.proto.DocumentSelection.$Properties;
        }

        /**
         * Properties of an AgentContainerConfig.
         * @deprecated Use optimization_guide.proto.AgentContainerConfig.$Properties instead.
         */
        interface IAgentContainerConfig extends optimization_guide.proto.AgentContainerConfig.$Properties {
        }

        /** Represents an AgentContainerConfig. */
        class AgentContainerConfig {

            /**
             * Constructs a new AgentContainerConfig.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AgentContainerConfig.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** AgentContainerConfig locationRules. */
            locationRules: optimization_guide.proto.LocationRule.$Properties[];

            /**
             * Creates a new AgentContainerConfig instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AgentContainerConfig instance
             */
            static create(properties: optimization_guide.proto.AgentContainerConfig.$Shape): optimization_guide.proto.AgentContainerConfig & optimization_guide.proto.AgentContainerConfig.$Shape;
            static create(properties?: optimization_guide.proto.AgentContainerConfig.$Properties): optimization_guide.proto.AgentContainerConfig;

            /**
             * Encodes the specified AgentContainerConfig message. Does not implicitly {@link optimization_guide.proto.AgentContainerConfig.verify|verify} messages.
             * @param message AgentContainerConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AgentContainerConfig.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AgentContainerConfig message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AgentContainerConfig & optimization_guide.proto.AgentContainerConfig.$Shape} AgentContainerConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AgentContainerConfig & optimization_guide.proto.AgentContainerConfig.$Shape;

            /**
             * Creates an AgentContainerConfig message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AgentContainerConfig
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AgentContainerConfig;

            /**
             * Creates a plain object from an AgentContainerConfig message. Also converts values to other types if specified.
             * @param message AgentContainerConfig
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AgentContainerConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AgentContainerConfig to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AgentContainerConfig {

            /** Properties of an AgentContainerConfig. */
            interface $Properties {

                /** AgentContainerConfig locationRules */
                locationRules?: (optimization_guide.proto.LocationRule.$Properties[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an AgentContainerConfig. */
            type $Shape = {
              locationRules?: optimization_guide.proto.LocationRule.$Shape[]|null;
              $unknowns?: Uint8Array[];
            };
        }

        /**
         * Properties of a LocationRule.
         * @deprecated Use optimization_guide.proto.LocationRule.$Properties instead.
         */
        interface ILocationRule extends optimization_guide.proto.LocationRule.$Properties {
        }

        /** Represents a LocationRule. */
        class LocationRule {

            /**
             * Constructs a new LocationRule.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.LocationRule.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** LocationRule location. */
            location?: (optimization_guide.proto.Location.$Properties|null);

            /** LocationRule metadata. */
            metadata?: (optimization_guide.proto.RuleMetadata.$Properties|null);

            /** LocationRule navigationSources. */
            navigationSources: optimization_guide.proto.NavigationSource.$Properties[];

            /**
             * Creates a new LocationRule instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LocationRule instance
             */
            static create(properties: optimization_guide.proto.LocationRule.$Shape): optimization_guide.proto.LocationRule & optimization_guide.proto.LocationRule.$Shape;
            static create(properties?: optimization_guide.proto.LocationRule.$Properties): optimization_guide.proto.LocationRule;

            /**
             * Encodes the specified LocationRule message. Does not implicitly {@link optimization_guide.proto.LocationRule.verify|verify} messages.
             * @param message LocationRule message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.LocationRule.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LocationRule message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.LocationRule & optimization_guide.proto.LocationRule.$Shape} LocationRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.LocationRule & optimization_guide.proto.LocationRule.$Shape;

            /**
             * Creates a LocationRule message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LocationRule
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.LocationRule;

            /**
             * Creates a plain object from a LocationRule message. Also converts values to other types if specified.
             * @param message LocationRule
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.LocationRule, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LocationRule to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace LocationRule {

            /** Properties of a LocationRule. */
            interface $Properties {

                /** LocationRule location */
                location?: (optimization_guide.proto.Location.$Properties|null);

                /** LocationRule metadata */
                metadata?: (optimization_guide.proto.RuleMetadata.$Properties|null);

                /** LocationRule navigationSources */
                navigationSources?: (optimization_guide.proto.NavigationSource.$Properties[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a LocationRule. */
            type $Shape = {
              location?: optimization_guide.proto.Location.$Shape|null;
              metadata?: optimization_guide.proto.RuleMetadata.$Shape|null;
              navigationSources?: optimization_guide.proto.NavigationSource.$Shape[]|null;
              $unknowns?: Uint8Array[];
            };
        }

        /**
         * Properties of a Location.
         * @deprecated Use optimization_guide.proto.Location.$Properties instead.
         */
        interface ILocation extends optimization_guide.proto.Location.$Properties {
        }

        /** Represents a Location. */
        class Location {

            /**
             * Constructs a new Location.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.Location.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Location origin. */
            origin?: (optimization_guide.proto.Origin.$Properties|null);

            /** Location site. */
            site?: (optimization_guide.proto.Site.$Properties|null);

            /** Location wildcard. */
            wildcard?: (optimization_guide.proto.AnySite.$Properties|null);

            /** Location identifierOneof. */
            identifierOneof?: ("origin"|"site"|"wildcard");

            /**
             * Creates a new Location instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Location instance
             */
            static create(properties: optimization_guide.proto.Location.$Shape): optimization_guide.proto.Location & optimization_guide.proto.Location.$Shape;
            static create(properties?: optimization_guide.proto.Location.$Properties): optimization_guide.proto.Location;

            /**
             * Encodes the specified Location message. Does not implicitly {@link optimization_guide.proto.Location.verify|verify} messages.
             * @param message Location message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.Location.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Location message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.Location & optimization_guide.proto.Location.$Shape} Location
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.Location & optimization_guide.proto.Location.$Shape;

            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Location
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.Location;

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @param message Location
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Location to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace Location {

            /** Properties of a Location. */
            interface $Properties {

                /** Location origin */
                origin?: (optimization_guide.proto.Origin.$Properties|null);

                /** Location site */
                site?: (optimization_guide.proto.Site.$Properties|null);

                /** Location wildcard */
                wildcard?: (optimization_guide.proto.AnySite.$Properties|null);

                /** Location identifierOneof */
                identifierOneof?: ("origin"|"site"|"wildcard");

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Narrowed shape of a Location. */
            type $Shape = {
              origin?: optimization_guide.proto.Origin.$Shape|null;
              site?: optimization_guide.proto.Site.$Shape|null;
              wildcard?: optimization_guide.proto.AnySite.$Shape|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ identifierOneof?: undefined; origin?: null; site?: null; wildcard?: null }|{ identifierOneof?: "origin"; origin: optimization_guide.proto.Origin.$Shape; site?: null; wildcard?: null }|{ identifierOneof?: "site"; origin?: null; site: optimization_guide.proto.Site.$Shape; wildcard?: null }|{ identifierOneof?: "wildcard"; origin?: null; site?: null; wildcard: optimization_guide.proto.AnySite.$Shape })
            );
        }

        /**
         * Properties of an Origin.
         * @deprecated Use optimization_guide.proto.Origin.$Properties instead.
         */
        interface IOrigin extends optimization_guide.proto.Origin.$Properties {
        }

        /** Represents an Origin. */
        class Origin {

            /**
             * Constructs a new Origin.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.Origin.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Origin protocol. */
            protocol: optimization_guide.proto.Protocol;

            /** Origin host. */
            host: string;

            /** Origin port. */
            port: number;

            /**
             * Creates a new Origin instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Origin instance
             */
            static create(properties: optimization_guide.proto.Origin.$Shape): optimization_guide.proto.Origin & optimization_guide.proto.Origin.$Shape;
            static create(properties?: optimization_guide.proto.Origin.$Properties): optimization_guide.proto.Origin;

            /**
             * Encodes the specified Origin message. Does not implicitly {@link optimization_guide.proto.Origin.verify|verify} messages.
             * @param message Origin message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.Origin.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Origin message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.Origin & optimization_guide.proto.Origin.$Shape} Origin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.Origin & optimization_guide.proto.Origin.$Shape;

            /**
             * Creates an Origin message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Origin
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.Origin;

            /**
             * Creates a plain object from an Origin message. Also converts values to other types if specified.
             * @param message Origin
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.Origin, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Origin to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace Origin {

            /** Properties of an Origin. */
            interface $Properties {

                /** Origin protocol */
                protocol?: (optimization_guide.proto.Protocol|null);

                /** Origin host */
                host?: (string|null);

                /** Origin port */
                port?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an Origin. */
            type $Shape = optimization_guide.proto.Origin.$Properties;
        }

        /**
         * Properties of a Site.
         * @deprecated Use optimization_guide.proto.Site.$Properties instead.
         */
        interface ISite extends optimization_guide.proto.Site.$Properties {
        }

        /** Represents a Site. */
        class Site {

            /**
             * Constructs a new Site.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.Site.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Site protocol. */
            protocol: optimization_guide.proto.Protocol;

            /** Site domain. */
            domain: string;

            /**
             * Creates a new Site instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Site instance
             */
            static create(properties: optimization_guide.proto.Site.$Shape): optimization_guide.proto.Site & optimization_guide.proto.Site.$Shape;
            static create(properties?: optimization_guide.proto.Site.$Properties): optimization_guide.proto.Site;

            /**
             * Encodes the specified Site message. Does not implicitly {@link optimization_guide.proto.Site.verify|verify} messages.
             * @param message Site message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.Site.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Site message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.Site & optimization_guide.proto.Site.$Shape} Site
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.Site & optimization_guide.proto.Site.$Shape;

            /**
             * Creates a Site message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Site
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.Site;

            /**
             * Creates a plain object from a Site message. Also converts values to other types if specified.
             * @param message Site
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.Site, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Site to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace Site {

            /** Properties of a Site. */
            interface $Properties {

                /** Site protocol */
                protocol?: (optimization_guide.proto.Protocol|null);

                /** Site domain */
                domain?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Site. */
            type $Shape = optimization_guide.proto.Site.$Properties;
        }

        /**
         * Properties of an AnySite.
         * @deprecated Use optimization_guide.proto.AnySite.$Properties instead.
         */
        interface IAnySite extends optimization_guide.proto.AnySite.$Properties {
        }

        /** Represents an AnySite. */
        class AnySite {

            /**
             * Constructs a new AnySite.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.AnySite.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /**
             * Creates a new AnySite instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AnySite instance
             */
            static create(properties: optimization_guide.proto.AnySite.$Shape): optimization_guide.proto.AnySite & optimization_guide.proto.AnySite.$Shape;
            static create(properties?: optimization_guide.proto.AnySite.$Properties): optimization_guide.proto.AnySite;

            /**
             * Encodes the specified AnySite message. Does not implicitly {@link optimization_guide.proto.AnySite.verify|verify} messages.
             * @param message AnySite message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.AnySite.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AnySite message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.AnySite & optimization_guide.proto.AnySite.$Shape} AnySite
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.AnySite & optimization_guide.proto.AnySite.$Shape;

            /**
             * Creates an AnySite message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AnySite
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.AnySite;

            /**
             * Creates a plain object from an AnySite message. Also converts values to other types if specified.
             * @param message AnySite
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.AnySite, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AnySite to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace AnySite {

            /** Properties of an AnySite. */
            interface $Properties {

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an AnySite. */
            type $Shape = optimization_guide.proto.AnySite.$Properties;
        }

        /**
         * Properties of a RuleMetadata.
         * @deprecated Use optimization_guide.proto.RuleMetadata.$Properties instead.
         */
        interface IRuleMetadata extends optimization_guide.proto.RuleMetadata.$Properties {
        }

        /** Represents a RuleMetadata. */
        class RuleMetadata {

            /**
             * Constructs a new RuleMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.RuleMetadata.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** RuleMetadata accessibleResources. */
            accessibleResources: optimization_guide.proto.RuleMetadata.AgentResource[];

            /** RuleMetadata capabilities. */
            capabilities: optimization_guide.proto.RuleMetadata.ActuationCapability[];

            /**
             * Creates a new RuleMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RuleMetadata instance
             */
            static create(properties: optimization_guide.proto.RuleMetadata.$Shape): optimization_guide.proto.RuleMetadata & optimization_guide.proto.RuleMetadata.$Shape;
            static create(properties?: optimization_guide.proto.RuleMetadata.$Properties): optimization_guide.proto.RuleMetadata;

            /**
             * Encodes the specified RuleMetadata message. Does not implicitly {@link optimization_guide.proto.RuleMetadata.verify|verify} messages.
             * @param message RuleMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.RuleMetadata.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RuleMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.RuleMetadata & optimization_guide.proto.RuleMetadata.$Shape} RuleMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.RuleMetadata & optimization_guide.proto.RuleMetadata.$Shape;

            /**
             * Creates a RuleMetadata message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RuleMetadata
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.RuleMetadata;

            /**
             * Creates a plain object from a RuleMetadata message. Also converts values to other types if specified.
             * @param message RuleMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.RuleMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RuleMetadata to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace RuleMetadata {

            /** Properties of a RuleMetadata. */
            interface $Properties {

                /** RuleMetadata accessibleResources */
                accessibleResources?: (optimization_guide.proto.RuleMetadata.AgentResource[]|null);

                /** RuleMetadata capabilities */
                capabilities?: (optimization_guide.proto.RuleMetadata.ActuationCapability[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a RuleMetadata. */
            type $Shape = optimization_guide.proto.RuleMetadata.$Properties;

            /** AgentResource enum. */
            enum AgentResource {

                /** RESOURCE_UNKNOWN value */
                RESOURCE_UNKNOWN = 0,

                /** RESOURCE_SESSION value */
                RESOURCE_SESSION = 1
            }

            /** ActuationCapability enum. */
            enum ActuationCapability {

                /** CAPABILITY_UNKNOWN value */
                CAPABILITY_UNKNOWN = 0,

                /** CAPABILITY_ALL value */
                CAPABILITY_ALL = 1
            }
        }

        /**
         * Properties of a NavigationSource.
         * @deprecated Use optimization_guide.proto.NavigationSource.$Properties instead.
         */
        interface INavigationSource extends optimization_guide.proto.NavigationSource.$Properties {
        }

        /** Represents a NavigationSource. */
        class NavigationSource {

            /**
             * Constructs a new NavigationSource.
             * @param [properties] Properties to set
             */
            constructor(properties?: optimization_guide.proto.NavigationSource.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** NavigationSource source. */
            source?: (optimization_guide.proto.Location.$Properties|null);

            /**
             * Creates a new NavigationSource instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NavigationSource instance
             */
            static create(properties: optimization_guide.proto.NavigationSource.$Shape): optimization_guide.proto.NavigationSource & optimization_guide.proto.NavigationSource.$Shape;
            static create(properties?: optimization_guide.proto.NavigationSource.$Properties): optimization_guide.proto.NavigationSource;

            /**
             * Encodes the specified NavigationSource message. Does not implicitly {@link optimization_guide.proto.NavigationSource.verify|verify} messages.
             * @param message NavigationSource message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: optimization_guide.proto.NavigationSource.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NavigationSource message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {optimization_guide.proto.NavigationSource & optimization_guide.proto.NavigationSource.$Shape} NavigationSource
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): optimization_guide.proto.NavigationSource & optimization_guide.proto.NavigationSource.$Shape;

            /**
             * Creates a NavigationSource message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NavigationSource
             */
            static fromObject(object: { [k: string]: any }): optimization_guide.proto.NavigationSource;

            /**
             * Creates a plain object from a NavigationSource message. Also converts values to other types if specified.
             * @param message NavigationSource
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: optimization_guide.proto.NavigationSource, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NavigationSource to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };
        }

        namespace NavigationSource {

            /** Properties of a NavigationSource. */
            interface $Properties {

                /** NavigationSource source */
                source?: (optimization_guide.proto.Location.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a NavigationSource. */
            type $Shape = {
              source?: optimization_guide.proto.Location.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        /** AXTextAffinity enum. */
        enum AXTextAffinity {

            /** AX_TEXT_AFFINITY_NONE value */
            AX_TEXT_AFFINITY_NONE = 0,

            /** AX_TEXT_AFFINITY_DOWNSTREAM value */
            AX_TEXT_AFFINITY_DOWNSTREAM = 1,

            /** AX_TEXT_AFFINITY_UPSTREAM value */
            AX_TEXT_AFFINITY_UPSTREAM = 2
        }

        /** AXRole enum. */
        enum AXRole {

            /** AX_ROLE_NONE value */
            AX_ROLE_NONE = 0,

            /** AX_ROLE_ABBR value */
            AX_ROLE_ABBR = 1,

            /** AX_ROLE_ALERT value */
            AX_ROLE_ALERT = 2,

            /** AX_ROLE_ALERTDIALOG value */
            AX_ROLE_ALERTDIALOG = 3,

            /** AX_ROLE_APPLICATION value */
            AX_ROLE_APPLICATION = 4,

            /** AX_ROLE_ARTICLE value */
            AX_ROLE_ARTICLE = 5,

            /** AX_ROLE_AUDIO value */
            AX_ROLE_AUDIO = 6,

            /** AX_ROLE_BANNER value */
            AX_ROLE_BANNER = 7,

            /** AX_ROLE_BLOCKQUOTE value */
            AX_ROLE_BLOCKQUOTE = 8,

            /** AX_ROLE_BUTTON value */
            AX_ROLE_BUTTON = 9,

            /** AX_ROLE_CANVAS value */
            AX_ROLE_CANVAS = 10,

            /** AX_ROLE_CAPTION value */
            AX_ROLE_CAPTION = 11,

            /** AX_ROLE_CARET value */
            AX_ROLE_CARET = 12,

            /** AX_ROLE_CELL value */
            AX_ROLE_CELL = 13,

            /** AX_ROLE_CHECKBOX value */
            AX_ROLE_CHECKBOX = 14,

            /** AX_ROLE_CLIENT value */
            AX_ROLE_CLIENT = 15,

            /** AX_ROLE_CODE value */
            AX_ROLE_CODE = 16,

            /** AX_ROLE_COLORWELL value */
            AX_ROLE_COLORWELL = 17,

            /** AX_ROLE_COLUMN value */
            AX_ROLE_COLUMN = 18,

            /** AX_ROLE_COLUMNHEADER value */
            AX_ROLE_COLUMNHEADER = 19,

            /** AX_ROLE_COMBOBOXGROUPING value */
            AX_ROLE_COMBOBOXGROUPING = 20,

            /** AX_ROLE_COMBOBOXMENUBUTTON value */
            AX_ROLE_COMBOBOXMENUBUTTON = 21,

            /** AX_ROLE_COMPLEMENTARY value */
            AX_ROLE_COMPLEMENTARY = 22,

            /** AX_ROLE_COMMENT value */
            AX_ROLE_COMMENT = 23,

            /** AX_ROLE_CONTENTDELETION value */
            AX_ROLE_CONTENTDELETION = 24,

            /** AX_ROLE_CONTENTINSERTION value */
            AX_ROLE_CONTENTINSERTION = 25,

            /** AX_ROLE_CONTENTINFO value */
            AX_ROLE_CONTENTINFO = 26,

            /** AX_ROLE_DATE value */
            AX_ROLE_DATE = 27,

            /** AX_ROLE_DATETIME value */
            AX_ROLE_DATETIME = 28,

            /** AX_ROLE_DEFINITION value */
            AX_ROLE_DEFINITION = 29,

            /** AX_ROLE_DESCRIPTIONLIST value */
            AX_ROLE_DESCRIPTIONLIST = 30,

            /** AX_ROLE_DESCRIPTIONLISTDETAILDEPRECATED value */
            AX_ROLE_DESCRIPTIONLISTDETAILDEPRECATED = 31,

            /** AX_ROLE_DESCRIPTIONLISTTERMDEPRECATED value */
            AX_ROLE_DESCRIPTIONLISTTERMDEPRECATED = 32,

            /** AX_ROLE_DESKTOP value */
            AX_ROLE_DESKTOP = 33,

            /** AX_ROLE_DETAILS value */
            AX_ROLE_DETAILS = 34,

            /** AX_ROLE_DIALOG value */
            AX_ROLE_DIALOG = 35,

            /** AX_ROLE_DIRECTORYDEPRECATED value */
            AX_ROLE_DIRECTORYDEPRECATED = 36,

            /** AX_ROLE_DISCLOSURETRIANGLE value */
            AX_ROLE_DISCLOSURETRIANGLE = 37,

            /** AX_ROLE_DOCABSTRACT value */
            AX_ROLE_DOCABSTRACT = 38,

            /** AX_ROLE_DOCACKNOWLEDGMENTS value */
            AX_ROLE_DOCACKNOWLEDGMENTS = 39,

            /** AX_ROLE_DOCAFTERWORD value */
            AX_ROLE_DOCAFTERWORD = 40,

            /** AX_ROLE_DOCAPPENDIX value */
            AX_ROLE_DOCAPPENDIX = 41,

            /** AX_ROLE_DOCBACKLINK value */
            AX_ROLE_DOCBACKLINK = 42,

            /** AX_ROLE_DOCBIBLIOENTRY value */
            AX_ROLE_DOCBIBLIOENTRY = 43,

            /** AX_ROLE_DOCBIBLIOGRAPHY value */
            AX_ROLE_DOCBIBLIOGRAPHY = 44,

            /** AX_ROLE_DOCBIBLIOREF value */
            AX_ROLE_DOCBIBLIOREF = 45,

            /** AX_ROLE_DOCCHAPTER value */
            AX_ROLE_DOCCHAPTER = 46,

            /** AX_ROLE_DOCCOLOPHON value */
            AX_ROLE_DOCCOLOPHON = 47,

            /** AX_ROLE_DOCCONCLUSION value */
            AX_ROLE_DOCCONCLUSION = 48,

            /** AX_ROLE_DOCCOVER value */
            AX_ROLE_DOCCOVER = 49,

            /** AX_ROLE_DOCCREDIT value */
            AX_ROLE_DOCCREDIT = 50,

            /** AX_ROLE_DOCCREDITS value */
            AX_ROLE_DOCCREDITS = 51,

            /** AX_ROLE_DOCDEDICATION value */
            AX_ROLE_DOCDEDICATION = 52,

            /** AX_ROLE_DOCENDNOTE value */
            AX_ROLE_DOCENDNOTE = 53,

            /** AX_ROLE_DOCENDNOTES value */
            AX_ROLE_DOCENDNOTES = 54,

            /** AX_ROLE_DOCEPIGRAPH value */
            AX_ROLE_DOCEPIGRAPH = 55,

            /** AX_ROLE_DOCEPILOGUE value */
            AX_ROLE_DOCEPILOGUE = 56,

            /** AX_ROLE_DOCERRATA value */
            AX_ROLE_DOCERRATA = 57,

            /** AX_ROLE_DOCEXAMPLE value */
            AX_ROLE_DOCEXAMPLE = 58,

            /** AX_ROLE_DOCFOOTNOTE value */
            AX_ROLE_DOCFOOTNOTE = 59,

            /** AX_ROLE_DOCFOREWORD value */
            AX_ROLE_DOCFOREWORD = 60,

            /** AX_ROLE_DOCGLOSSARY value */
            AX_ROLE_DOCGLOSSARY = 61,

            /** AX_ROLE_DOCGLOSSREF value */
            AX_ROLE_DOCGLOSSREF = 62,

            /** AX_ROLE_DOCINDEX value */
            AX_ROLE_DOCINDEX = 63,

            /** AX_ROLE_DOCINTRODUCTION value */
            AX_ROLE_DOCINTRODUCTION = 64,

            /** AX_ROLE_DOCNOTEREF value */
            AX_ROLE_DOCNOTEREF = 65,

            /** AX_ROLE_DOCNOTICE value */
            AX_ROLE_DOCNOTICE = 66,

            /** AX_ROLE_DOCPAGEBREAK value */
            AX_ROLE_DOCPAGEBREAK = 67,

            /** AX_ROLE_DOCPAGEFOOTER value */
            AX_ROLE_DOCPAGEFOOTER = 68,

            /** AX_ROLE_DOCPAGEHEADER value */
            AX_ROLE_DOCPAGEHEADER = 69,

            /** AX_ROLE_DOCPAGELIST value */
            AX_ROLE_DOCPAGELIST = 70,

            /** AX_ROLE_DOCPART value */
            AX_ROLE_DOCPART = 71,

            /** AX_ROLE_DOCPREFACE value */
            AX_ROLE_DOCPREFACE = 72,

            /** AX_ROLE_DOCPROLOGUE value */
            AX_ROLE_DOCPROLOGUE = 73,

            /** AX_ROLE_DOCPULLQUOTE value */
            AX_ROLE_DOCPULLQUOTE = 74,

            /** AX_ROLE_DOCQNA value */
            AX_ROLE_DOCQNA = 75,

            /** AX_ROLE_DOCSUBTITLE value */
            AX_ROLE_DOCSUBTITLE = 76,

            /** AX_ROLE_DOCTIP value */
            AX_ROLE_DOCTIP = 77,

            /** AX_ROLE_DOCTOC value */
            AX_ROLE_DOCTOC = 78,

            /** AX_ROLE_DOCUMENT value */
            AX_ROLE_DOCUMENT = 79,

            /** AX_ROLE_EMBEDDEDOBJECT value */
            AX_ROLE_EMBEDDEDOBJECT = 80,

            /** AX_ROLE_EMPHASIS value */
            AX_ROLE_EMPHASIS = 81,

            /** AX_ROLE_FEED value */
            AX_ROLE_FEED = 82,

            /** AX_ROLE_FIGCAPTION value */
            AX_ROLE_FIGCAPTION = 83,

            /** AX_ROLE_FIGURE value */
            AX_ROLE_FIGURE = 84,

            /** AX_ROLE_FOOTER value */
            AX_ROLE_FOOTER = 85,

            /** AX_ROLE_SECTIONFOOTER value */
            AX_ROLE_SECTIONFOOTER = 86,

            /** AX_ROLE_FORM value */
            AX_ROLE_FORM = 87,

            /** AX_ROLE_GENERICCONTAINER value */
            AX_ROLE_GENERICCONTAINER = 88,

            /** AX_ROLE_GRAPHICSDOCUMENT value */
            AX_ROLE_GRAPHICSDOCUMENT = 89,

            /** AX_ROLE_GRAPHICSOBJECT value */
            AX_ROLE_GRAPHICSOBJECT = 90,

            /** AX_ROLE_GRAPHICSSYMBOL value */
            AX_ROLE_GRAPHICSSYMBOL = 91,

            /** AX_ROLE_GRID value */
            AX_ROLE_GRID = 92,

            /** AX_ROLE_GROUP value */
            AX_ROLE_GROUP = 93,

            /** AX_ROLE_HEADER value */
            AX_ROLE_HEADER = 94,

            /** AX_ROLE_SECTIONHEADER value */
            AX_ROLE_SECTIONHEADER = 95,

            /** AX_ROLE_HEADING value */
            AX_ROLE_HEADING = 96,

            /** AX_ROLE_IFRAME value */
            AX_ROLE_IFRAME = 97,

            /** AX_ROLE_IFRAMEPRESENTATIONAL value */
            AX_ROLE_IFRAMEPRESENTATIONAL = 98,

            /** AX_ROLE_IMAGE value */
            AX_ROLE_IMAGE = 99,

            /** AX_ROLE_IMECANDIDATE value */
            AX_ROLE_IMECANDIDATE = 100,

            /** AX_ROLE_INLINETEXTBOX value */
            AX_ROLE_INLINETEXTBOX = 101,

            /** AX_ROLE_INPUTTIME value */
            AX_ROLE_INPUTTIME = 102,

            /** AX_ROLE_KEYBOARD value */
            AX_ROLE_KEYBOARD = 103,

            /** AX_ROLE_LABELTEXT value */
            AX_ROLE_LABELTEXT = 104,

            /** AX_ROLE_LAYOUTTABLE value */
            AX_ROLE_LAYOUTTABLE = 105,

            /** AX_ROLE_LAYOUTTABLECELL value */
            AX_ROLE_LAYOUTTABLECELL = 106,

            /** AX_ROLE_LAYOUTTABLEROW value */
            AX_ROLE_LAYOUTTABLEROW = 107,

            /** AX_ROLE_LEGEND value */
            AX_ROLE_LEGEND = 108,

            /** AX_ROLE_LINEBREAK value */
            AX_ROLE_LINEBREAK = 109,

            /** AX_ROLE_LINK value */
            AX_ROLE_LINK = 110,

            /** AX_ROLE_LIST value */
            AX_ROLE_LIST = 111,

            /** AX_ROLE_LISTBOX value */
            AX_ROLE_LISTBOX = 112,

            /** AX_ROLE_LISTBOXOPTION value */
            AX_ROLE_LISTBOXOPTION = 113,

            /** AX_ROLE_LISTGRID value */
            AX_ROLE_LISTGRID = 114,

            /** AX_ROLE_LISTITEM value */
            AX_ROLE_LISTITEM = 115,

            /** AX_ROLE_LISTMARKER value */
            AX_ROLE_LISTMARKER = 116,

            /** AX_ROLE_LOG value */
            AX_ROLE_LOG = 117,

            /** AX_ROLE_MAIN value */
            AX_ROLE_MAIN = 118,

            /** AX_ROLE_MARK value */
            AX_ROLE_MARK = 119,

            /** AX_ROLE_MARQUEE value */
            AX_ROLE_MARQUEE = 120,

            /** AX_ROLE_MATH value */
            AX_ROLE_MATH = 121,

            /** AX_ROLE_MENU value */
            AX_ROLE_MENU = 122,

            /** AX_ROLE_MENUBAR value */
            AX_ROLE_MENUBAR = 123,

            /** AX_ROLE_MENUITEM value */
            AX_ROLE_MENUITEM = 124,

            /** AX_ROLE_MENUITEMCHECKBOX value */
            AX_ROLE_MENUITEMCHECKBOX = 125,

            /** AX_ROLE_MENUITEMRADIO value */
            AX_ROLE_MENUITEMRADIO = 126,

            /** AX_ROLE_MENUITEMSEPARATOR value */
            AX_ROLE_MENUITEMSEPARATOR = 213,

            /** AX_ROLE_MENULISTOPTION value */
            AX_ROLE_MENULISTOPTION = 127,

            /** AX_ROLE_MENULISTPOPUP value */
            AX_ROLE_MENULISTPOPUP = 128,

            /** AX_ROLE_METER value */
            AX_ROLE_METER = 129,

            /** AX_ROLE_NAVIGATION value */
            AX_ROLE_NAVIGATION = 130,

            /** AX_ROLE_NOTE value */
            AX_ROLE_NOTE = 131,

            /** AX_ROLE_PANE value */
            AX_ROLE_PANE = 132,

            /** AX_ROLE_PARAGRAPH value */
            AX_ROLE_PARAGRAPH = 133,

            /** AX_ROLE_PDFACTIONABLEHIGHLIGHT value */
            AX_ROLE_PDFACTIONABLEHIGHLIGHT = 134,

            /** AX_ROLE_PDFROOT value */
            AX_ROLE_PDFROOT = 135,

            /** AX_ROLE_PLUGINOBJECT value */
            AX_ROLE_PLUGINOBJECT = 136,

            /** AX_ROLE_POPUPBUTTON value */
            AX_ROLE_POPUPBUTTON = 137,

            /** AX_ROLE_PORTALDEPRECATED value */
            AX_ROLE_PORTALDEPRECATED = 138,

            /** AX_ROLE_PREDEPRECATED value */
            AX_ROLE_PREDEPRECATED = 139,

            /** AX_ROLE_PROGRESSINDICATOR value */
            AX_ROLE_PROGRESSINDICATOR = 140,

            /** AX_ROLE_RADIOBUTTON value */
            AX_ROLE_RADIOBUTTON = 141,

            /** AX_ROLE_RADIOGROUP value */
            AX_ROLE_RADIOGROUP = 142,

            /** AX_ROLE_REGION value */
            AX_ROLE_REGION = 143,

            /** AX_ROLE_ROOTWEBAREA value */
            AX_ROLE_ROOTWEBAREA = 144,

            /** AX_ROLE_ROW value */
            AX_ROLE_ROW = 145,

            /** AX_ROLE_ROWGROUP value */
            AX_ROLE_ROWGROUP = 146,

            /** AX_ROLE_ROWHEADER value */
            AX_ROLE_ROWHEADER = 147,

            /** AX_ROLE_RUBY value */
            AX_ROLE_RUBY = 148,

            /** AX_ROLE_RUBYANNOTATION value */
            AX_ROLE_RUBYANNOTATION = 149,

            /** AX_ROLE_SCROLLBAR value */
            AX_ROLE_SCROLLBAR = 150,

            /** AX_ROLE_SCROLLVIEW value */
            AX_ROLE_SCROLLVIEW = 151,

            /** AX_ROLE_SEARCH value */
            AX_ROLE_SEARCH = 152,

            /** AX_ROLE_SEARCHBOX value */
            AX_ROLE_SEARCHBOX = 153,

            /** AX_ROLE_SECTION value */
            AX_ROLE_SECTION = 154,

            /** AX_ROLE_SLIDER value */
            AX_ROLE_SLIDER = 155,

            /** AX_ROLE_SPINBUTTON value */
            AX_ROLE_SPINBUTTON = 156,

            /** AX_ROLE_SPLITTER value */
            AX_ROLE_SPLITTER = 157,

            /** AX_ROLE_STATICTEXT value */
            AX_ROLE_STATICTEXT = 158,

            /** AX_ROLE_STATUS value */
            AX_ROLE_STATUS = 159,

            /** AX_ROLE_STRONG value */
            AX_ROLE_STRONG = 160,

            /** AX_ROLE_SUGGESTION value */
            AX_ROLE_SUGGESTION = 161,

            /** AX_ROLE_SVGROOT value */
            AX_ROLE_SVGROOT = 162,

            /** AX_ROLE_SWITCH value */
            AX_ROLE_SWITCH = 163,

            /** AX_ROLE_TAB value */
            AX_ROLE_TAB = 164,

            /** AX_ROLE_TABLIST value */
            AX_ROLE_TABLIST = 165,

            /** AX_ROLE_TABPANEL value */
            AX_ROLE_TABPANEL = 166,

            /** AX_ROLE_TABLE value */
            AX_ROLE_TABLE = 167,

            /** AX_ROLE_TABLEHEADERCONTAINER value */
            AX_ROLE_TABLEHEADERCONTAINER = 168,

            /** AX_ROLE_TERM value */
            AX_ROLE_TERM = 169,

            /** AX_ROLE_TEXTFIELD value */
            AX_ROLE_TEXTFIELD = 170,

            /** AX_ROLE_TEXTFIELDWITHCOMBOBOX value */
            AX_ROLE_TEXTFIELDWITHCOMBOBOX = 171,

            /** AX_ROLE_TIME value */
            AX_ROLE_TIME = 172,

            /** AX_ROLE_TIMER value */
            AX_ROLE_TIMER = 173,

            /** AX_ROLE_TITLEBAR value */
            AX_ROLE_TITLEBAR = 174,

            /** AX_ROLE_TOGGLEBUTTON value */
            AX_ROLE_TOGGLEBUTTON = 175,

            /** AX_ROLE_TOOLBAR value */
            AX_ROLE_TOOLBAR = 176,

            /** AX_ROLE_TOOLTIP value */
            AX_ROLE_TOOLTIP = 177,

            /** AX_ROLE_TREE value */
            AX_ROLE_TREE = 178,

            /** AX_ROLE_TREEGRID value */
            AX_ROLE_TREEGRID = 179,

            /** AX_ROLE_TREEITEM value */
            AX_ROLE_TREEITEM = 180,

            /** AX_ROLE_UNKNOWN value */
            AX_ROLE_UNKNOWN = 181,

            /** AX_ROLE_VIDEO value */
            AX_ROLE_VIDEO = 182,

            /** AX_ROLE_WEBVIEW value */
            AX_ROLE_WEBVIEW = 183,

            /** AX_ROLE_WINDOW value */
            AX_ROLE_WINDOW = 184,

            /** AX_ROLE_SUBSCRIPT value */
            AX_ROLE_SUBSCRIPT = 185,

            /** AX_ROLE_SUPERSCRIPT value */
            AX_ROLE_SUPERSCRIPT = 186,

            /** AX_ROLE_MATHMLMATH value */
            AX_ROLE_MATHMLMATH = 187,

            /** AX_ROLE_MATHMLFRACTION value */
            AX_ROLE_MATHMLFRACTION = 188,

            /** AX_ROLE_MATHMLIDENTIFIER value */
            AX_ROLE_MATHMLIDENTIFIER = 189,

            /** AX_ROLE_MATHMLMULTISCRIPTS value */
            AX_ROLE_MATHMLMULTISCRIPTS = 190,

            /** AX_ROLE_MATHMLNONESCRIPT value */
            AX_ROLE_MATHMLNONESCRIPT = 191,

            /** AX_ROLE_MATHMLNUMBER value */
            AX_ROLE_MATHMLNUMBER = 192,

            /** AX_ROLE_MATHMLOPERATOR value */
            AX_ROLE_MATHMLOPERATOR = 193,

            /** AX_ROLE_MATHMLOVER value */
            AX_ROLE_MATHMLOVER = 194,

            /** AX_ROLE_MATHMLPRESCRIPTDELIMITER value */
            AX_ROLE_MATHMLPRESCRIPTDELIMITER = 195,

            /** AX_ROLE_MATHMLROOT value */
            AX_ROLE_MATHMLROOT = 196,

            /** AX_ROLE_MATHMLROW value */
            AX_ROLE_MATHMLROW = 197,

            /** AX_ROLE_MATHMLSQUAREROOT value */
            AX_ROLE_MATHMLSQUAREROOT = 198,

            /** AX_ROLE_MATHMLSTRINGLITERAL value */
            AX_ROLE_MATHMLSTRINGLITERAL = 199,

            /** AX_ROLE_MATHMLSUB value */
            AX_ROLE_MATHMLSUB = 200,

            /** AX_ROLE_MATHMLSUBSUP value */
            AX_ROLE_MATHMLSUBSUP = 201,

            /** AX_ROLE_MATHMLSUP value */
            AX_ROLE_MATHMLSUP = 202,

            /** AX_ROLE_MATHMLTABLE value */
            AX_ROLE_MATHMLTABLE = 203,

            /** AX_ROLE_MATHMLTABLECELL value */
            AX_ROLE_MATHMLTABLECELL = 204,

            /** AX_ROLE_MATHMLTABLEROW value */
            AX_ROLE_MATHMLTABLEROW = 205,

            /** AX_ROLE_MATHMLTEXT value */
            AX_ROLE_MATHMLTEXT = 206,

            /** AX_ROLE_MATHMLUNDER value */
            AX_ROLE_MATHMLUNDER = 207,

            /** AX_ROLE_MATHMLUNDEROVER value */
            AX_ROLE_MATHMLUNDEROVER = 208,

            /** AX_ROLE_COMBOBOXSELECT value */
            AX_ROLE_COMBOBOXSELECT = 209,

            /** AX_ROLE_DISCLOSURETRIANGLEGROUPED value */
            AX_ROLE_DISCLOSURETRIANGLEGROUPED = 210,

            /** AX_ROLE_SECTIONWITHOUTNAME value */
            AX_ROLE_SECTIONWITHOUTNAME = 211,

            /** AX_ROLE_GRIDCELL value */
            AX_ROLE_GRIDCELL = 212
        }

        /** AXStringAttribute enum. */
        enum AXStringAttribute {

            /** AX_SA_NONE value */
            AX_SA_NONE = 0,

            /** AX_SA_ACCESSKEY value */
            AX_SA_ACCESSKEY = 1,

            /** AX_SA_APPID value */
            AX_SA_APPID = 2,

            /** AX_SA_ARIAINVALIDVALUEDEPRECATED value */
            AX_SA_ARIAINVALIDVALUEDEPRECATED = 3,

            /** AX_SA_AUTOCOMPLETE value */
            AX_SA_AUTOCOMPLETE = 4,

            /** AX_SA_CHECKEDSTATEDESCRIPTION value */
            AX_SA_CHECKEDSTATEDESCRIPTION = 5,

            /** AX_SA_CHILDTREEID value */
            AX_SA_CHILDTREEID = 6,

            /** AX_SA_CHILDTREENODEAPPID value */
            AX_SA_CHILDTREENODEAPPID = 7,

            /** AX_SA_CLASSNAME value */
            AX_SA_CLASSNAME = 8,

            /** AX_SA_CONTAINERLIVERELEVANT value */
            AX_SA_CONTAINERLIVERELEVANT = 9,

            /** AX_SA_CONTAINERLIVESTATUS value */
            AX_SA_CONTAINERLIVESTATUS = 10,

            /** AX_SA_DESCRIPTION value */
            AX_SA_DESCRIPTION = 11,

            /** AX_SA_DISPLAY value */
            AX_SA_DISPLAY = 12,

            /** AX_SA_FONTFAMILY value */
            AX_SA_FONTFAMILY = 13,

            /** AX_SA_HTMLTAG value */
            AX_SA_HTMLTAG = 14,

            /** AX_SA_IMAGEANNOTATION value */
            AX_SA_IMAGEANNOTATION = 15,

            /** AX_SA_IMAGEDATAURL value */
            AX_SA_IMAGEDATAURL = 16,

            /** AX_SA_MATHCONTENT value */
            AX_SA_MATHCONTENT = 17,

            /** AX_SA_INPUTTYPE value */
            AX_SA_INPUTTYPE = 18,

            /** AX_SA_KEYSHORTCUTS value */
            AX_SA_KEYSHORTCUTS = 19,

            /** AX_SA_LANGUAGE value */
            AX_SA_LANGUAGE = 20,

            /** AX_SA_NAME value */
            AX_SA_NAME = 21,

            /** AX_SA_LIVERELEVANT value */
            AX_SA_LIVERELEVANT = 22,

            /** AX_SA_LIVESTATUS value */
            AX_SA_LIVESTATUS = 23,

            /** AX_SA_PLACEHOLDER value */
            AX_SA_PLACEHOLDER = 24,

            /** AX_SA_ROLE value */
            AX_SA_ROLE = 25,

            /** AX_SA_ROLEDESCRIPTION value */
            AX_SA_ROLEDESCRIPTION = 26,

            /** AX_SA_TOOLTIP value */
            AX_SA_TOOLTIP = 27,

            /** AX_SA_URL value */
            AX_SA_URL = 28,

            /** AX_SA_VALUE value */
            AX_SA_VALUE = 29,

            /** AX_SA_VIRTUALCONTENT value */
            AX_SA_VIRTUALCONTENT = 30,

            /** AX_SA_DODEFAULTLABEL value */
            AX_SA_DODEFAULTLABEL = 31,

            /** AX_SA_LONGCLICKLABEL value */
            AX_SA_LONGCLICKLABEL = 32,

            /** AX_SA_ARIABRAILLELABEL value */
            AX_SA_ARIABRAILLELABEL = 33,

            /** AX_SA_ARIABRAILLEROLEDESCRIPTION value */
            AX_SA_ARIABRAILLEROLEDESCRIPTION = 34,

            /** AX_SA_LINKTARGET value */
            AX_SA_LINKTARGET = 35,

            /** AX_SA_ARIANOTIFICATIONANNOUNCEMENTDEPRECATED value */
            AX_SA_ARIANOTIFICATIONANNOUNCEMENTDEPRECATED = 36,

            /** AX_SA_ARIANOTIFICATIONIDDEPRECATED value */
            AX_SA_ARIANOTIFICATIONIDDEPRECATED = 37,

            /** AX_SA_HTMLID value */
            AX_SA_HTMLID = 38,

            /** AX_SA_ARIACELLCOLUMNINDEXTEXT value */
            AX_SA_ARIACELLCOLUMNINDEXTEXT = 39,

            /** AX_SA_ARIACELLROWINDEXTEXT value */
            AX_SA_ARIACELLROWINDEXTEXT = 40,

            /** AX_SA_DATETIME value */
            AX_SA_DATETIME = 41,

            /** AX_SA_HTMLINPUTNAME value */
            AX_SA_HTMLINPUTNAME = 42,

            /** AX_SA_MATHARG value */
            AX_SA_MATHARG = 43,

            /** AX_SA_MATHINTENT value */
            AX_SA_MATHINTENT = 44,

            /** AX_SA_CANVASANNOTATION value */
            AX_SA_CANVASANNOTATION = 45,

            /** AX_SA_ARIAVALUETEXT value */
            AX_SA_ARIAVALUETEXT = 46
        }

        /** AXIntAttribute enum. */
        enum AXIntAttribute {

            /** AX_IA_NONE value */
            AX_IA_NONE = 0,

            /** AX_IA_DEFAULTACTIONVERB value */
            AX_IA_DEFAULTACTIONVERB = 1,

            /** AX_IA_SCROLLX value */
            AX_IA_SCROLLX = 2,

            /** AX_IA_SCROLLXMIN value */
            AX_IA_SCROLLXMIN = 3,

            /** AX_IA_SCROLLXMAX value */
            AX_IA_SCROLLXMAX = 4,

            /** AX_IA_SCROLLY value */
            AX_IA_SCROLLY = 5,

            /** AX_IA_SCROLLYMIN value */
            AX_IA_SCROLLYMIN = 6,

            /** AX_IA_SCROLLYMAX value */
            AX_IA_SCROLLYMAX = 7,

            /** AX_IA_TEXTSELSTART value */
            AX_IA_TEXTSELSTART = 8,

            /** AX_IA_TEXTSELEND value */
            AX_IA_TEXTSELEND = 9,

            /** AX_IA_ARIACOLUMNCOUNT value */
            AX_IA_ARIACOLUMNCOUNT = 10,

            /** AX_IA_ARIACELLCOLUMNINDEX value */
            AX_IA_ARIACELLCOLUMNINDEX = 11,

            /** AX_IA_ARIACELLCOLUMNSPAN value */
            AX_IA_ARIACELLCOLUMNSPAN = 12,

            /** AX_IA_ARIAROWCOUNT value */
            AX_IA_ARIAROWCOUNT = 13,

            /** AX_IA_ARIACELLROWINDEX value */
            AX_IA_ARIACELLROWINDEX = 14,

            /** AX_IA_ARIACELLROWSPAN value */
            AX_IA_ARIACELLROWSPAN = 15,

            /** AX_IA_TABLEROWCOUNT value */
            AX_IA_TABLEROWCOUNT = 16,

            /** AX_IA_TABLECOLUMNCOUNT value */
            AX_IA_TABLECOLUMNCOUNT = 17,

            /** AX_IA_TABLEHEADERID value */
            AX_IA_TABLEHEADERID = 18,

            /** AX_IA_TABLEROWINDEX value */
            AX_IA_TABLEROWINDEX = 19,

            /** AX_IA_TABLEROWHEADERID value */
            AX_IA_TABLEROWHEADERID = 20,

            /** AX_IA_TABLECOLUMNINDEX value */
            AX_IA_TABLECOLUMNINDEX = 21,

            /** AX_IA_TABLECOLUMNHEADERID value */
            AX_IA_TABLECOLUMNHEADERID = 22,

            /** AX_IA_TABLECELLCOLUMNINDEX value */
            AX_IA_TABLECELLCOLUMNINDEX = 23,

            /** AX_IA_TABLECELLCOLUMNSPAN value */
            AX_IA_TABLECELLCOLUMNSPAN = 24,

            /** AX_IA_TABLECELLROWINDEX value */
            AX_IA_TABLECELLROWINDEX = 25,

            /** AX_IA_TABLECELLROWSPAN value */
            AX_IA_TABLECELLROWSPAN = 26,

            /** AX_IA_SORTDIRECTION value */
            AX_IA_SORTDIRECTION = 27,

            /** AX_IA_HIERARCHICALLEVEL value */
            AX_IA_HIERARCHICALLEVEL = 28,

            /** AX_IA_NAMEFROM value */
            AX_IA_NAMEFROM = 29,

            /** AX_IA_DESCRIPTIONFROM value */
            AX_IA_DESCRIPTIONFROM = 30,

            /** AX_IA_ACTIVEDESCENDANTID value */
            AX_IA_ACTIVEDESCENDANTID = 31,

            /** AX_IA_ERRORMESSAGEIDDEPRECATED value */
            AX_IA_ERRORMESSAGEIDDEPRECATED = 32,

            /** AX_IA_INPAGELINKTARGETID value */
            AX_IA_INPAGELINKTARGETID = 33,

            /** AX_IA_MEMBEROFID value */
            AX_IA_MEMBEROFID = 34,

            /** AX_IA_NEXTONLINEID value */
            AX_IA_NEXTONLINEID = 35,

            /** AX_IA_POPUPFORID value */
            AX_IA_POPUPFORID = 36,

            /** AX_IA_PREVIOUSONLINEID value */
            AX_IA_PREVIOUSONLINEID = 37,

            /** AX_IA_RESTRICTION value */
            AX_IA_RESTRICTION = 38,

            /** AX_IA_SETSIZE value */
            AX_IA_SETSIZE = 39,

            /** AX_IA_POSINSET value */
            AX_IA_POSINSET = 40,

            /** AX_IA_COLORVALUE value */
            AX_IA_COLORVALUE = 41,

            /** AX_IA_ARIACURRENTSTATE value */
            AX_IA_ARIACURRENTSTATE = 42,

            /** AX_IA_BACKGROUNDCOLOR value */
            AX_IA_BACKGROUNDCOLOR = 43,

            /** AX_IA_COLOR value */
            AX_IA_COLOR = 44,

            /** AX_IA_HASPOPUP value */
            AX_IA_HASPOPUP = 45,

            /** AX_IA_IMAGEANNOTATIONSTATUS value */
            AX_IA_IMAGEANNOTATIONSTATUS = 46,

            /** AX_IA_INVALIDSTATE value */
            AX_IA_INVALIDSTATE = 47,

            /** AX_IA_CHECKEDSTATE value */
            AX_IA_CHECKEDSTATE = 48,

            /** AX_IA_LISTSTYLE value */
            AX_IA_LISTSTYLE = 49,

            /** AX_IA_TEXTALIGN value */
            AX_IA_TEXTALIGN = 50,

            /** AX_IA_TEXTDIRECTION value */
            AX_IA_TEXTDIRECTION = 51,

            /** AX_IA_TEXTPOSITION value */
            AX_IA_TEXTPOSITION = 52,

            /** AX_IA_TEXTSTYLE value */
            AX_IA_TEXTSTYLE = 53,

            /** AX_IA_TEXTOVERLINESTYLE value */
            AX_IA_TEXTOVERLINESTYLE = 54,

            /** AX_IA_TEXTSTRIKETHROUGHSTYLE value */
            AX_IA_TEXTSTRIKETHROUGHSTYLE = 55,

            /** AX_IA_TEXTUNDERLINESTYLE value */
            AX_IA_TEXTUNDERLINESTYLE = 56,

            /** AX_IA_PREVIOUSFOCUSID value */
            AX_IA_PREVIOUSFOCUSID = 57,

            /** AX_IA_NEXTFOCUSID value */
            AX_IA_NEXTFOCUSID = 58,

            /** AX_IA_DROPEFFECTDEPRECATED value */
            AX_IA_DROPEFFECTDEPRECATED = 59,

            /** AX_IA_DOMNODEIDDEPRECATED value */
            AX_IA_DOMNODEIDDEPRECATED = 60,

            /** AX_IA_ISPOPUP value */
            AX_IA_ISPOPUP = 61,

            /** AX_IA_NEXTWINDOWFOCUSID value */
            AX_IA_NEXTWINDOWFOCUSID = 62,

            /** AX_IA_PREVIOUSWINDOWFOCUSID value */
            AX_IA_PREVIOUSWINDOWFOCUSID = 63,

            /** AX_IA_ARIANOTIFICATIONINTERRUPTDEPRECATED value */
            AX_IA_ARIANOTIFICATIONINTERRUPTDEPRECATED = 64,

            /** AX_IA_ARIANOTIFICATIONPRIORITYDEPRECATED value */
            AX_IA_ARIANOTIFICATIONPRIORITYDEPRECATED = 65,

            /** AX_IA_DETAILSFROM value */
            AX_IA_DETAILSFROM = 66,

            /** AX_IA_MAXLENGTH value */
            AX_IA_MAXLENGTH = 67,

            /** AX_IA_PAINTORDER value */
            AX_IA_PAINTORDER = 68,

            /** AX_IA_COMMITTEDTEXTLENGTH value */
            AX_IA_COMMITTEDTEXTLENGTH = 69
        }

        /** AXFloatAttribute enum. */
        enum AXFloatAttribute {

            /** AX_FA_NONE value */
            AX_FA_NONE = 0,

            /** AX_FA_VALUEFORRANGE value */
            AX_FA_VALUEFORRANGE = 1,

            /** AX_FA_MINVALUEFORRANGE value */
            AX_FA_MINVALUEFORRANGE = 2,

            /** AX_FA_MAXVALUEFORRANGE value */
            AX_FA_MAXVALUEFORRANGE = 3,

            /** AX_FA_STEPVALUEFORRANGE value */
            AX_FA_STEPVALUEFORRANGE = 4,

            /** AX_FA_FONTSIZE value */
            AX_FA_FONTSIZE = 5,

            /** AX_FA_FONTWEIGHT value */
            AX_FA_FONTWEIGHT = 6,

            /** AX_FA_TEXTINDENT value */
            AX_FA_TEXTINDENT = 7,

            /** AX_FA_CHILDTREESCALE value */
            AX_FA_CHILDTREESCALE = 8
        }

        /** AXBoolAttribute enum. */
        enum AXBoolAttribute {

            /** AX_BA_NONE value */
            AX_BA_NONE = 0,

            /** AX_BA_BUSY value */
            AX_BA_BUSY = 1,

            /** AX_BA_NONATOMICTEXTFIELDROOT value */
            AX_BA_NONATOMICTEXTFIELDROOT = 2,

            /** AX_BA_CONTAINERLIVEATOMIC value */
            AX_BA_CONTAINERLIVEATOMIC = 3,

            /** AX_BA_CONTAINERLIVEBUSY value */
            AX_BA_CONTAINERLIVEBUSY = 4,

            /** AX_BA_LIVEATOMIC value */
            AX_BA_LIVEATOMIC = 5,

            /** AX_BA_MODAL value */
            AX_BA_MODAL = 6,

            /** AX_BA_UPDATELOCATIONONLY value */
            AX_BA_UPDATELOCATIONONLY = 7,

            /** AX_BA_CANVASHASFALLBACK value */
            AX_BA_CANVASHASFALLBACK = 8,

            /** AX_BA_SCROLLABLE value */
            AX_BA_SCROLLABLE = 9,

            /** AX_BA_CLICKABLE value */
            AX_BA_CLICKABLE = 10,

            /** AX_BA_CLIPSCHILDREN value */
            AX_BA_CLIPSCHILDREN = 11,

            /** AX_BA_NOTUSERSELECTABLESTYLE value */
            AX_BA_NOTUSERSELECTABLESTYLE = 12,

            /** AX_BA_SELECTED value */
            AX_BA_SELECTED = 13,

            /** AX_BA_SELECTEDFROMFOCUS value */
            AX_BA_SELECTEDFROMFOCUS = 14,

            /** AX_BA_SUPPORTSTEXTLOCATION value */
            AX_BA_SUPPORTSTEXTLOCATION = 15,

            /** AX_BA_GRABBEDDEPRECATED value */
            AX_BA_GRABBEDDEPRECATED = 16,

            /** AX_BA_ISLINEBREAKINGOBJECT value */
            AX_BA_ISLINEBREAKINGOBJECT = 17,

            /** AX_BA_ISPAGEBREAKINGOBJECT value */
            AX_BA_ISPAGEBREAKINGOBJECT = 18,

            /** AX_BA_HASARIAATTRIBUTE value */
            AX_BA_HASARIAATTRIBUTE = 19,

            /** AX_BA_TOUCHPASSTHROUGHDEPRECATED value */
            AX_BA_TOUCHPASSTHROUGHDEPRECATED = 20,

            /** AX_BA_LONGCLICKABLE value */
            AX_BA_LONGCLICKABLE = 21,

            /** AX_BA_HASHIDDENOFFSCREENNODES value */
            AX_BA_HASHIDDENOFFSCREENNODES = 22,

            /** AX_BA_HASCOMPOSITION value */
            AX_BA_HASCOMPOSITION = 23,

            /** AX_BA_COMMITTEDBYIME value */
            AX_BA_COMMITTEDBYIME = 24,

            /** AX_BA_TEXTSUGGESTIONSELECTEDBYIME value */
            AX_BA_TEXTSUGGESTIONSELECTEDBYIME = 25
        }

        /** AXIntListAttribute enum. */
        enum AXIntListAttribute {

            /** AX_ILA_NONE value */
            AX_ILA_NONE = 0,

            /** AX_ILA_INDIRECTCHILDIDS value */
            AX_ILA_INDIRECTCHILDIDS = 1,

            /** AX_ILA_ACTIONSIDS value */
            AX_ILA_ACTIONSIDS = 29,

            /** AX_ILA_CONTROLSIDS value */
            AX_ILA_CONTROLSIDS = 2,

            /** AX_ILA_DETAILSIDS value */
            AX_ILA_DETAILSIDS = 3,

            /** AX_ILA_DESCRIBEDBYIDS value */
            AX_ILA_DESCRIBEDBYIDS = 4,

            /** AX_ILA_FLOWTOIDS value */
            AX_ILA_FLOWTOIDS = 5,

            /** AX_ILA_LABELLEDBYIDS value */
            AX_ILA_LABELLEDBYIDS = 6,

            /** AX_ILA_RADIOGROUPIDS value */
            AX_ILA_RADIOGROUPIDS = 7,

            /** AX_ILA_MARKERTYPES value */
            AX_ILA_MARKERTYPES = 8,

            /** AX_ILA_MARKERSTARTS value */
            AX_ILA_MARKERSTARTS = 9,

            /** AX_ILA_MARKERENDS value */
            AX_ILA_MARKERENDS = 10,

            /** AX_ILA_CHARACTEROFFSETS value */
            AX_ILA_CHARACTEROFFSETS = 11,

            /** AX_ILA_LINESTARTS value */
            AX_ILA_LINESTARTS = 12,

            /** AX_ILA_WORDSTARTS value */
            AX_ILA_WORDSTARTS = 13,

            /** AX_ILA_WORDENDS value */
            AX_ILA_WORDENDS = 14,

            /** AX_ILA_CUSTOMACTIONIDS value */
            AX_ILA_CUSTOMACTIONIDS = 15,

            /** AX_ILA_CARETBOUNDS value */
            AX_ILA_CARETBOUNDS = 16,

            /** AX_ILA_LINEENDS value */
            AX_ILA_LINEENDS = 17,

            /** AX_ILA_SENTENCESTARTS value */
            AX_ILA_SENTENCESTARTS = 18,

            /** AX_ILA_SENTENCEENDS value */
            AX_ILA_SENTENCEENDS = 19,

            /** AX_ILA_HIGHLIGHTTYPES value */
            AX_ILA_HIGHLIGHTTYPES = 20,

            /** AX_ILA_TEXTOPERATIONSTARTANCHORIDS value */
            AX_ILA_TEXTOPERATIONSTARTANCHORIDS = 21,

            /** AX_ILA_TEXTOPERATIONSTARTOFFSETS value */
            AX_ILA_TEXTOPERATIONSTARTOFFSETS = 22,

            /** AX_ILA_TEXTOPERATIONENDANCHORIDS value */
            AX_ILA_TEXTOPERATIONENDANCHORIDS = 23,

            /** AX_ILA_TEXTOPERATIONENDOFFSETS value */
            AX_ILA_TEXTOPERATIONENDOFFSETS = 24,

            /** AX_ILA_TEXTOPERATIONS value */
            AX_ILA_TEXTOPERATIONS = 25,

            /** AX_ILA_ERRORMESSAGEIDS value */
            AX_ILA_ERRORMESSAGEIDS = 26,

            /** AX_ILA_ARIANOTIFICATIONINTERRUPTPROPERTIES value */
            AX_ILA_ARIANOTIFICATIONINTERRUPTPROPERTIES = 27,

            /** AX_ILA_ARIANOTIFICATIONPRIORITYPROPERTIES value */
            AX_ILA_ARIANOTIFICATIONPRIORITYPROPERTIES = 28
        }

        /** AXStringListAttribute enum. */
        enum AXStringListAttribute {

            /** AX_SLA_NONE value */
            AX_SLA_NONE = 0,

            /** AX_SLA_CUSTOMACTIONDESCRIPTIONS value */
            AX_SLA_CUSTOMACTIONDESCRIPTIONS = 1,

            /** AX_SLA_ARIANOTIFICATIONANNOUNCEMENTS value */
            AX_SLA_ARIANOTIFICATIONANNOUNCEMENTS = 2,

            /** AX_SLA_ARIANOTIFICATIONTYPES value */
            AX_SLA_ARIANOTIFICATIONTYPES = 3,

            /** AX_SLA_TEXTOPERATIONREPLACEMENTSTRINGS value */
            AX_SLA_TEXTOPERATIONREPLACEMENTSTRINGS = 4
        }

        /** AnnotatedPageContentVersion enum. */
        enum AnnotatedPageContentVersion {

            /** ANNOTATED_PAGE_CONTENT_VERSION_UNKNOWN value */
            ANNOTATED_PAGE_CONTENT_VERSION_UNKNOWN = 0,

            /** ANNOTATED_PAGE_CONTENT_VERSION_1_0 value */
            ANNOTATED_PAGE_CONTENT_VERSION_1_0 = 1,

            /** ANNOTATED_PAGE_CONTENT_VERSION_ONLY_ACTIONABLE_ELEMENTS_1_0 value */
            ANNOTATED_PAGE_CONTENT_VERSION_ONLY_ACTIONABLE_ELEMENTS_1_0 = 2,

            /** ANNOTATED_PAGE_CONTENT_VERSION_MAX_VALID value */
            ANNOTATED_PAGE_CONTENT_VERSION_MAX_VALID = 2
        }

        /** AnnotatedPageContentMode enum. */
        enum AnnotatedPageContentMode {

            /** ANNOTATED_PAGE_CONTENT_MODE_DEFAULT value */
            ANNOTATED_PAGE_CONTENT_MODE_DEFAULT = 0,

            /** ANNOTATED_PAGE_CONTENT_MODE_ACTIONABLE_ELEMENTS value */
            ANNOTATED_PAGE_CONTENT_MODE_ACTIONABLE_ELEMENTS = 1
        }

        /** ContentAttributeType enum. */
        enum ContentAttributeType {

            /** CONTENT_ATTRIBUTE_UNKNOWN value */
            CONTENT_ATTRIBUTE_UNKNOWN = 0,

            /** CONTENT_ATTRIBUTE_ROOT value */
            CONTENT_ATTRIBUTE_ROOT = 1,

            /** CONTENT_ATTRIBUTE_CONTAINER value */
            CONTENT_ATTRIBUTE_CONTAINER = 2,

            /** CONTENT_ATTRIBUTE_IFRAME value */
            CONTENT_ATTRIBUTE_IFRAME = 3,

            /** CONTENT_ATTRIBUTE_PARAGRAPH value */
            CONTENT_ATTRIBUTE_PARAGRAPH = 4,

            /** CONTENT_ATTRIBUTE_HEADING value */
            CONTENT_ATTRIBUTE_HEADING = 5,

            /** CONTENT_ATTRIBUTE_TEXT value */
            CONTENT_ATTRIBUTE_TEXT = 20,

            /** CONTENT_ATTRIBUTE_ANCHOR value */
            CONTENT_ATTRIBUTE_ANCHOR = 22,

            /** CONTENT_ATTRIBUTE_IMAGE value */
            CONTENT_ATTRIBUTE_IMAGE = 9,

            /** CONTENT_ATTRIBUTE_SVG_ROOT value */
            CONTENT_ATTRIBUTE_SVG_ROOT = 25,

            /** CONTENT_ATTRIBUTE_CANVAS value */
            CONTENT_ATTRIBUTE_CANVAS = 26,

            /** CONTENT_ATTRIBUTE_VIDEO value */
            CONTENT_ATTRIBUTE_VIDEO = 27,

            /** CONTENT_ATTRIBUTE_ORDERED_LIST value */
            CONTENT_ATTRIBUTE_ORDERED_LIST = 6,

            /** CONTENT_ATTRIBUTE_UNORDERED_LIST value */
            CONTENT_ATTRIBUTE_UNORDERED_LIST = 7,

            /** CONTENT_ATTRIBUTE_LIST_ITEM value */
            CONTENT_ATTRIBUTE_LIST_ITEM = 23,

            /** CONTENT_ATTRIBUTE_FORM value */
            CONTENT_ATTRIBUTE_FORM = 8,

            /** CONTENT_ATTRIBUTE_FORM_CONTROL value */
            CONTENT_ATTRIBUTE_FORM_CONTROL = 24,

            /** CONTENT_ATTRIBUTE_TABLE value */
            CONTENT_ATTRIBUTE_TABLE = 10,

            /** CONTENT_ATTRIBUTE_TABLE_ROW value */
            CONTENT_ATTRIBUTE_TABLE_ROW = 21,

            /** CONTENT_ATTRIBUTE_TABLE_CELL value */
            CONTENT_ATTRIBUTE_TABLE_CELL = 11,

            /** CONTENT_ATTRIBUTE_DIALOG_MODAL value */
            CONTENT_ATTRIBUTE_DIALOG_MODAL = 28,

            /** CONTENT_ATTRIBUTE_DIALOG_MODELESS value */
            CONTENT_ATTRIBUTE_DIALOG_MODELESS = 29
        }

        /** CssPosition enum. */
        enum CssPosition {

            /** CSS_POSITION_STATIC_DEFAULT value */
            CSS_POSITION_STATIC_DEFAULT = 0,

            /** CSS_POSITION_RELATIVE value */
            CSS_POSITION_RELATIVE = 1,

            /** CSS_POSITION_ABSOLUTE value */
            CSS_POSITION_ABSOLUTE = 2,

            /** CSS_POSITION_FIXED value */
            CSS_POSITION_FIXED = 3,

            /** CSS_POSITION_STICKY value */
            CSS_POSITION_STICKY = 4
        }

        /** ClickabilityReason enum. */
        enum ClickabilityReason {

            /** CLICKABILITY_REASON_CLICKABLE_CONTROL value */
            CLICKABILITY_REASON_CLICKABLE_CONTROL = 0,

            /** CLICKABILITY_REASON_CLICK_HANDLER value */
            CLICKABILITY_REASON_CLICK_HANDLER = 1,

            /** CLICKABILITY_REASON_MOUSE_EVENTS value */
            CLICKABILITY_REASON_MOUSE_EVENTS = 2,

            /** CLICKABILITY_REASON_KEY_EVENTS value */
            CLICKABILITY_REASON_KEY_EVENTS = 3,

            /** CLICKABILITY_REASON_EDITABLE value */
            CLICKABILITY_REASON_EDITABLE = 4,

            /** CLICKABILITY_REASON_CURSOR_POINTER value */
            CLICKABILITY_REASON_CURSOR_POINTER = 5,

            /** CLICKABILITY_REASON_ARIA_ROLE value */
            CLICKABILITY_REASON_ARIA_ROLE = 6,

            /** CLICKABILITY_REASON_ARIA_HAS_POPUP value */
            CLICKABILITY_REASON_ARIA_HAS_POPUP = 7,

            /** CLICKABILITY_REASON_ARIA_EXPANDED_TRUE value */
            CLICKABILITY_REASON_ARIA_EXPANDED_TRUE = 8,

            /** CLICKABILITY_REASON_ARIA_EXPANDED_FALSE value */
            CLICKABILITY_REASON_ARIA_EXPANDED_FALSE = 9,

            /** CLICKABILITY_REASON_TAB_INDEX value */
            CLICKABILITY_REASON_TAB_INDEX = 10,

            /** CLICKABILITY_REASON_AUTOCOMPLETE value */
            CLICKABILITY_REASON_AUTOCOMPLETE = 11,

            /** CLICKABILITY_REASON_MOUSE_CLICK value */
            CLICKABILITY_REASON_MOUSE_CLICK = 12,

            /** CLICKABILITY_REASON_MOUSE_HOVER value */
            CLICKABILITY_REASON_MOUSE_HOVER = 13,

            /** CLICKABILITY_REASON_HOVER_PSEUDO_CLASS value */
            CLICKABILITY_REASON_HOVER_PSEUDO_CLASS = 14,

            /** CLICKABILITY_REASON_ARIA_TOGGLE value */
            CLICKABILITY_REASON_ARIA_TOGGLE = 15,

            /** CLICKABILITY_REASON_ARIA_SELECTABLE value */
            CLICKABILITY_REASON_ARIA_SELECTABLE = 16
        }

        /** InteractionDisabledReason enum. */
        enum InteractionDisabledReason {

            /** INTERACTION_DISABLED_REASON_UNSPECIFIED value */
            INTERACTION_DISABLED_REASON_UNSPECIFIED = 0,

            /** INTERACTION_DISABLED_REASON_DISABLED value */
            INTERACTION_DISABLED_REASON_DISABLED = 1,

            /** INTERACTION_DISABLED_REASON_ARIA_DISABLED value */
            INTERACTION_DISABLED_REASON_ARIA_DISABLED = 2,

            /** INTERACTION_DISABLED_REASON_CURSOR_NOT_ALLOWED value */
            INTERACTION_DISABLED_REASON_CURSOR_NOT_ALLOWED = 3,

            /** INTERACTION_DISABLED_REASON_ARIA_HIDDEN value */
            INTERACTION_DISABLED_REASON_ARIA_HIDDEN = 4,

            /** INTERACTION_DISABLED_REASON_ARIA_ROLE_PRESENTATIONAL value */
            INTERACTION_DISABLED_REASON_ARIA_ROLE_PRESENTATIONAL = 5
        }

        /** TextSize enum. */
        enum TextSize {

            /** TEXT_SIZE_M_DEFAULT value */
            TEXT_SIZE_M_DEFAULT = 0,

            /** TEXT_SIZE_XS value */
            TEXT_SIZE_XS = 1,

            /** TEXT_SIZE_S value */
            TEXT_SIZE_S = 2,

            /** TEXT_SIZE_L value */
            TEXT_SIZE_L = 3,

            /** TEXT_SIZE_XL value */
            TEXT_SIZE_XL = 4
        }

        /** AnchorRel enum. */
        enum AnchorRel {

            /** ANCHOR_REL_UNKNOWN value */
            ANCHOR_REL_UNKNOWN = 0,

            /** ANCHOR_REL_NO_REFERRER value */
            ANCHOR_REL_NO_REFERRER = 1,

            /** ANCHOR_REL_NO_OPENER value */
            ANCHOR_REL_NO_OPENER = 2,

            /** ANCHOR_REL_OPENER value */
            ANCHOR_REL_OPENER = 3,

            /** ANCHOR_REL_PRIVACY_POLICY value */
            ANCHOR_REL_PRIVACY_POLICY = 4,

            /** ANCHOR_REL_TERMS_OF_SERVICE value */
            ANCHOR_REL_TERMS_OF_SERVICE = 5
        }

        /** FormControlType enum. */
        enum FormControlType {

            /** FORM_CONTROL_TYPE_UNSPECIFIED value */
            FORM_CONTROL_TYPE_UNSPECIFIED = 0,

            /** FORM_CONTROL_TYPE_CONTENT_EDITABLE value */
            FORM_CONTROL_TYPE_CONTENT_EDITABLE = 1,

            /** FORM_CONTROL_TYPE_INPUT_CHECKBOX value */
            FORM_CONTROL_TYPE_INPUT_CHECKBOX = 2,

            /** FORM_CONTROL_TYPE_INPUT_EMAIL value */
            FORM_CONTROL_TYPE_INPUT_EMAIL = 3,

            /** FORM_CONTROL_TYPE_INPUT_MONTH value */
            FORM_CONTROL_TYPE_INPUT_MONTH = 4,

            /** FORM_CONTROL_TYPE_INPUT_NUMBER value */
            FORM_CONTROL_TYPE_INPUT_NUMBER = 5,

            /** FORM_CONTROL_TYPE_INPUT_PASSWORD value */
            FORM_CONTROL_TYPE_INPUT_PASSWORD = 6,

            /** FORM_CONTROL_TYPE_INPUT_RADIO value */
            FORM_CONTROL_TYPE_INPUT_RADIO = 7,

            /** FORM_CONTROL_TYPE_INPUT_SEARCH value */
            FORM_CONTROL_TYPE_INPUT_SEARCH = 8,

            /** FORM_CONTROL_TYPE_INPUT_TELEPHONE value */
            FORM_CONTROL_TYPE_INPUT_TELEPHONE = 9,

            /** FORM_CONTROL_TYPE_INPUT_TEXT value */
            FORM_CONTROL_TYPE_INPUT_TEXT = 10,

            /** FORM_CONTROL_TYPE_INPUT_URL value */
            FORM_CONTROL_TYPE_INPUT_URL = 11,

            /** FORM_CONTROL_TYPE_SELECT_ONE value */
            FORM_CONTROL_TYPE_SELECT_ONE = 12,

            /** FORM_CONTROL_TYPE_SELECT_MULTIPLE value */
            FORM_CONTROL_TYPE_SELECT_MULTIPLE = 13,

            /** FORM_CONTROL_TYPE_TEXT_AREA value */
            FORM_CONTROL_TYPE_TEXT_AREA = 15,

            /** FORM_CONTROL_TYPE_BUTTON_BUTTON value */
            FORM_CONTROL_TYPE_BUTTON_BUTTON = 16,

            /** FORM_CONTROL_TYPE_BUTTON_SUBMIT value */
            FORM_CONTROL_TYPE_BUTTON_SUBMIT = 17,

            /** FORM_CONTROL_TYPE_BUTTON_RESET value */
            FORM_CONTROL_TYPE_BUTTON_RESET = 18,

            /** FORM_CONTROL_TYPE_BUTTON_POPOVER value */
            FORM_CONTROL_TYPE_BUTTON_POPOVER = 19,

            /** FORM_CONTROL_TYPE_FIELDSET value */
            FORM_CONTROL_TYPE_FIELDSET = 20,

            /** FORM_CONTROL_TYPE_INPUT_BUTTON value */
            FORM_CONTROL_TYPE_INPUT_BUTTON = 21,

            /** FORM_CONTROL_TYPE_INPUT_COLOR value */
            FORM_CONTROL_TYPE_INPUT_COLOR = 22,

            /** FORM_CONTROL_TYPE_INPUT_DATE value */
            FORM_CONTROL_TYPE_INPUT_DATE = 23,

            /** FORM_CONTROL_TYPE_INPUT_DATETIME_LOCAL value */
            FORM_CONTROL_TYPE_INPUT_DATETIME_LOCAL = 24,

            /** FORM_CONTROL_TYPE_INPUT_FILE value */
            FORM_CONTROL_TYPE_INPUT_FILE = 25,

            /** FORM_CONTROL_TYPE_INPUT_HIDDEN value */
            FORM_CONTROL_TYPE_INPUT_HIDDEN = 26,

            /** FORM_CONTROL_TYPE_INPUT_IMAGE value */
            FORM_CONTROL_TYPE_INPUT_IMAGE = 27,

            /** FORM_CONTROL_TYPE_INPUT_RANGE value */
            FORM_CONTROL_TYPE_INPUT_RANGE = 28,

            /** FORM_CONTROL_TYPE_INPUT_RESET value */
            FORM_CONTROL_TYPE_INPUT_RESET = 29,

            /** FORM_CONTROL_TYPE_INPUT_SUBMIT value */
            FORM_CONTROL_TYPE_INPUT_SUBMIT = 30,

            /** FORM_CONTROL_TYPE_INPUT_TIME value */
            FORM_CONTROL_TYPE_INPUT_TIME = 31,

            /** FORM_CONTROL_TYPE_INPUT_WEEK value */
            FORM_CONTROL_TYPE_INPUT_WEEK = 32,

            /** FORM_CONTROL_TYPE_OUTPUT value */
            FORM_CONTROL_TYPE_OUTPUT = 33
        }

        /** RedactionDecision enum. */
        enum RedactionDecision {

            /** REDACTION_DECISION_NO_REDACTION_NECESSARY value */
            REDACTION_DECISION_NO_REDACTION_NECESSARY = 0,

            /** REDACTION_DECISION_UNREDACTED_EMPTY_PASSWORD value */
            REDACTION_DECISION_UNREDACTED_EMPTY_PASSWORD = 1,

            /** REDACTION_DECISION_REDACTED_HAS_BEEN_PASSWORD value */
            REDACTION_DECISION_REDACTED_HAS_BEEN_PASSWORD = 2,

            /** REDACTION_DECISION_UNREDACTED_EMPTY_PAYMENT_FIELD value */
            REDACTION_DECISION_UNREDACTED_EMPTY_PAYMENT_FIELD = 3,

            /** REDACTION_DECISION_REDACTED_IS_SENSITIVE_PAYMENT_FIELD value */
            REDACTION_DECISION_REDACTED_IS_SENSITIVE_PAYMENT_FIELD = 4,

            /** REDACTION_DECISION_UNREDACTED_EMPTY_CUSTOM_PASSWORD value */
            REDACTION_DECISION_UNREDACTED_EMPTY_CUSTOM_PASSWORD = 5,

            /** REDACTION_DECISION_REDACTED_CUSTOM_PASSWORD_CSS value */
            REDACTION_DECISION_REDACTED_CUSTOM_PASSWORD_CSS = 6,

            /** REDACTION_DECISION_REDACTED_CUSTOM_PASSWORD_JS value */
            REDACTION_DECISION_REDACTED_CUSTOM_PASSWORD_JS = 7,

            /** REDACTION_DECISION_REDACTED_IS_OTP value */
            REDACTION_DECISION_REDACTED_IS_OTP = 8,

            /** REDACTION_DECISION_UNREDACTED_EMPTY_OTP_FIELD value */
            REDACTION_DECISION_UNREDACTED_EMPTY_OTP_FIELD = 9
        }

        /** CoarseAutofillFieldType enum. */
        enum CoarseAutofillFieldType {

            /** COARSE_AUTOFILL_FIELD_TYPE_UNSUPPORTED value */
            COARSE_AUTOFILL_FIELD_TYPE_UNSUPPORTED = 0,

            /** COARSE_AUTOFILL_FIELD_TYPE_ADDRESS value */
            COARSE_AUTOFILL_FIELD_TYPE_ADDRESS = 1,

            /** COARSE_AUTOFILL_FIELD_TYPE_CREDIT_CARD value */
            COARSE_AUTOFILL_FIELD_TYPE_CREDIT_CARD = 2,

            /** COARSE_AUTOFILL_FIELD_TYPE_OTP value */
            COARSE_AUTOFILL_FIELD_TYPE_OTP = 3
        }

        /** MediaDataType enum. */
        enum MediaDataType {

            /** MEDIA_DATA_TYPE_UNKNOWN value */
            MEDIA_DATA_TYPE_UNKNOWN = 0,

            /** MEDIA_DATA_TYPE_VIDEO value */
            MEDIA_DATA_TYPE_VIDEO = 1,

            /** MEDIA_DATA_TYPE_AUDIO value */
            MEDIA_DATA_TYPE_AUDIO = 2
        }

        /** TableRowType enum. */
        enum TableRowType {

            /** TABLE_ROW_TYPE_UNKNOWN value */
            TABLE_ROW_TYPE_UNKNOWN = 0,

            /** TABLE_ROW_TYPE_HEADER value */
            TABLE_ROW_TYPE_HEADER = 1,

            /** TABLE_ROW_TYPE_BODY value */
            TABLE_ROW_TYPE_BODY = 2,

            /** TABLE_ROW_TYPE_FOOTER value */
            TABLE_ROW_TYPE_FOOTER = 3
        }

        /** AnnotatedRole enum. */
        enum AnnotatedRole {

            /** ANNOTATED_ROLE_UNKNOWN value */
            ANNOTATED_ROLE_UNKNOWN = 0,

            /** ANNOTATED_ROLE_HEADER value */
            ANNOTATED_ROLE_HEADER = 5,

            /** ANNOTATED_ROLE_NAV value */
            ANNOTATED_ROLE_NAV = 6,

            /** ANNOTATED_ROLE_SEARCH value */
            ANNOTATED_ROLE_SEARCH = 7,

            /** ANNOTATED_ROLE_MAIN value */
            ANNOTATED_ROLE_MAIN = 8,

            /** ANNOTATED_ROLE_ARTICLE value */
            ANNOTATED_ROLE_ARTICLE = 9,

            /** ANNOTATED_ROLE_SECTION value */
            ANNOTATED_ROLE_SECTION = 10,

            /** ANNOTATED_ROLE_ASIDE value */
            ANNOTATED_ROLE_ASIDE = 11,

            /** ANNOTATED_ROLE_FOOTER value */
            ANNOTATED_ROLE_FOOTER = 12,

            /** ANNOTATED_ROLE_CONTENT_HIDDEN value */
            ANNOTATED_ROLE_CONTENT_HIDDEN = 13,

            /** ANNOTATED_ROLE_PAID_CONTENT value */
            ANNOTATED_ROLE_PAID_CONTENT = 14
        }

        /** Protocol enum. */
        enum Protocol {

            /** PROTOCOL_UNKNOWN value */
            PROTOCOL_UNKNOWN = 0,

            /** PROTOCOL_HTTP value */
            PROTOCOL_HTTP = 1,

            /** PROTOCOL_HTTPS value */
            PROTOCOL_HTTPS = 2,

            /** PROTOCOL_WS value */
            PROTOCOL_WS = 3,

            /** PROTOCOL_WSS value */
            PROTOCOL_WSS = 4
        }

        /** FinalModelStatus enum. */
        enum FinalModelStatus {

            /** FINAL_MODEL_STATUS_UNSPECIFIED value */
            FINAL_MODEL_STATUS_UNSPECIFIED = 0,

            /** FINAL_MODEL_STATUS_SUCCESS value */
            FINAL_MODEL_STATUS_SUCCESS = 1,

            /** FINAL_MODEL_STATUS_FAILURE value */
            FINAL_MODEL_STATUS_FAILURE = 2
        }

        /** UserFeedback enum. */
        enum UserFeedback {

            /** USER_FEEDBACK_UNSPECIFIED value */
            USER_FEEDBACK_UNSPECIFIED = 0,

            /** USER_FEEDBACK_THUMBS_DOWN value */
            USER_FEEDBACK_THUMBS_DOWN = 1,

            /** USER_FEEDBACK_THUMBS_UP value */
            USER_FEEDBACK_THUMBS_UP = 2
        }

        /** ChromePlatform enum. */
        enum ChromePlatform {

            /** CHROME_PLATFORM_UNKNOWN value */
            CHROME_PLATFORM_UNKNOWN = 0,

            /** CHROME_PLATFORM_ANDROID value */
            CHROME_PLATFORM_ANDROID = 1,

            /** CHROME_PLATFORM_CHROMEOS value */
            CHROME_PLATFORM_CHROMEOS = 2,

            /** CHROME_PLATFORM_IOS value */
            CHROME_PLATFORM_IOS = 3,

            /** CHROME_PLATFORM_LINUX value */
            CHROME_PLATFORM_LINUX = 4,

            /** CHROME_PLATFORM_MAC value */
            CHROME_PLATFORM_MAC = 5,

            /** CHROME_PLATFORM_WINDOWS value */
            CHROME_PLATFORM_WINDOWS = 6
        }
    }
}
