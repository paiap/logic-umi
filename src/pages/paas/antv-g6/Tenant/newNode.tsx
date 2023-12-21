import { Group, Rect, Text } from '@antv/g6-react-node';
import React from 'react';

export const newNode = () => {
  return (
    <Group draggable>
      <Rect
        style={{
          width: 100,
          height: 'auto',
          fill: '#fff',
          stroke: '#ddd',
          shadowColor: '#eee',
          shadowBlur: 30,
          radius: [8],
          justifyContent: 'center',
          padding: [5, 0],
        }}
        draggable
      >
        <Text
          style={{
            fill: '#000',
            margin: [5, 24],
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          租户名
        </Text>
        <Text style={{ fill: '#ccc', fontSize: 12, margin: 'auto' }}>
          一段描述
        </Text>
      </Rect>
    </Group>
  );
};

// export default () => <G6MiniDemo nodeType="test" count={1} height={400} />;