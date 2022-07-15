import protobufjs from "protobufjs";

import { generateProto } from "./generateProto";
import { foxgloveEnumSchemas, foxgloveMessageSchemas } from "./schemas";
import { exampleEnum, exampleMessage } from "./testFixtures";

describe("generateProto", () => {
  it("generates .proto files", () => {
    expect(generateProto(exampleMessage, [exampleEnum])).toMatchInlineSnapshot(`
      "// Generated from ExampleMessage by @foxglove/schemas

      syntax = \\"proto3\\";

      import \\"foxglove/NestedMessage.proto\\";
      import \\"google/protobuf/duration.proto\\";
      import \\"google/protobuf/timestamp.proto\\";

      package foxglove;

      // An example type
      message ExampleMessage {
        // An example enum
        enum ExampleProtoEnum {
          // Value A
          A = 1;

          // Value B
          B = 2;
        }
        // duration field
        google.protobuf.Duration field_duration = 1;

        // time field
        google.protobuf.Timestamp field_time = 2;

        // boolean field
        bool field_boolean = 3;

        // bytes field
        bytes field_bytes = 4;

        // float64 field
        double field_float64 = 5;

        // uint32 field
        fixed32 field_uint32 = 6;

        // string field
        string field_string = 7;

        // duration array field
        repeated google.protobuf.Duration field_duration_array = 8;

        // time array field
        repeated google.protobuf.Timestamp field_time_array = 9;

        // boolean array field
        repeated bool field_boolean_array = 10;

        // bytes array field
        repeated bytes field_bytes_array = 11;

        // float64 array field
        repeated double field_float64_array = 12;

        // uint32 array field
        repeated fixed32 field_uint32_array = 13;

        // string array field
        repeated string field_string_array = 14;

        // duration fixed-length array field
        repeated google.protobuf.Duration field_duration_fixed_array = 15; // length 3

        // time fixed-length array field
        repeated google.protobuf.Timestamp field_time_fixed_array = 16; // length 3

        // boolean fixed-length array field
        repeated bool field_boolean_fixed_array = 17; // length 3

        // bytes fixed-length array field
        repeated bytes field_bytes_fixed_array = 18; // length 3

        // float64 fixed-length array field
        repeated double field_float64_fixed_array = 19; // length 3

        // uint32 fixed-length array field
        repeated fixed32 field_uint32_fixed_array = 20; // length 3

        // string fixed-length array field
        repeated string field_string_fixed_array = 21; // length 3

        // An enum field
        ExampleProtoEnum field_enum = 22;

        // An enum array field
        repeated ExampleProtoEnum field_enum_array = 23;

        // A nested field
        foxglove.NestedMessage field_nested = 24;

        // A nested array field
        // With
        // a
        // very
        // long
        // description
        repeated foxglove.NestedMessage field_nested_array = 25;
      }
      "
    `);
  });

  it("generates parseable .proto files", () => {
    const root = new protobufjs.Root();
    root.addJSON(protobufjs.common.get("google/protobuf/timestamp.proto")!.nested!);
    root.addJSON(protobufjs.common.get("google/protobuf/duration.proto")!.nested!);
    for (const schema of Object.values(foxgloveMessageSchemas)) {
      const enums = Object.values(foxgloveEnumSchemas).filter(
        (enumSchema) => enumSchema.protobufParentMessageName === schema.name,
      );
      root.add(protobufjs.parse(generateProto(schema, enums)).root);
    }
    expect(() => root.resolveAll()).not.toThrow();
  });
});
