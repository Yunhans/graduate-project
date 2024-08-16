import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ReactFlow, ReactFlowProvider, MarkerType, MiniMap, Controls, Background, useNodesState, useEdgesState, applyNodeChanges, applyEdgeChanges, addEdge, Panel, ConnectionMode,} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TableNode from './TableNode';
import SimpleFloatingEdge from './SimpleFloatingEdge';
import { LinkMarkers } from './Markers';
import Sidebar from './Sidebar';

import { handleSpecificTable, handleTableDrag } from './messageHandlers';

const proOptions = { hideAttribution: true };

const nodeTypes = {
	table: TableNode,
};

const edgeTypes = {
	floating: SimpleFloatingEdge,
};


const initialNodes = [
	{
		id: '1',
		type: 'table',
		data: {
			id: '1',
			label: 'Product',
			attribute: [
			{ name: 'product_id', type: 'int', isKey: true },
			{ name: 'quantity', type: 'int', isKey: false },
			{ name: 'product_type', type: 'char', isKey: false }
			]
		},
		position: { x: 0, y: 0 }
	},
	{
		id: '2',
		type: 'table',
		data: {
			id: '2',
			label: 'Order',
			attribute: [
			{ name: 'order_id', type: 'int', isKey: true },
			{ name: 'product_id', type: 'int', isKey: false },
			{ name: 'quantity', type: 'int', isKey: false }
			]
		},
		position: { x: 100, y: 100 }
	}
];

const initialEdges = [
	{ id: '1->2', source: '1', target: '2', markerStart: 'hasManyReversed',sourceHandle: 'a', targetHandle: 'b', label: '1-m', type: 'floating' },
];

const getNodeId = () => `randomnode_${+new Date()}`;

function App() {

	// // with initial
	// const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	// const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	// without initial
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const timerRef = useRef(null);

	const handleNodeStopDrag = () => {
		console.log('Node drag stopped for 2 seconds. Triggering function...');
		// to do
		const nodes = window.nodesRef.current;
		const nodeData = nodes.map(function(value) {
			return {
				id: value.id,
				position: value.position
			};
		});
		// console.log(nodeData);
		handleTableDrag(nodeData);
	};

	// 當移動節點時觸發
	const handleNodesChange = (changes) => {
		onNodesChange(changes);

		// 重置計時器
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		// 如果節點移動，則啟動計時器
		timerRef.current = setTimeout(() => {
			handleNodeStopDrag();
		}, 2000);
	};
	
	const onConnect = useCallback(
		(connection) => {
		  const edge = { ...connection, type: 'floating', markerStart: 'hasManyReversed' };
		  setEdges((eds) => addEdge(edge, eds));
		},
		[setEdges],
	  );

	const onAdd = useCallback(() => {
		const newNode = {
		  id: getNodeId(),
		  type: 'table',
		  data: {
			id: 'id',
			label: 'new Table',
			attribute:[
				{ name: 'id', type: 'INT', isKey: true }
			]
		   },
		  position: {
			x: (Math.random() - 0.5) * 400,
			y: (Math.random() - 0.5) * 400,
		  },
		};
		setNodes((nds) => nds.concat(newNode));
	}, [setNodes]);

	useEffect(() => {
		console.log('useEffect');
	
		function receiveMessage(e) {
			// console.log('Message received:', e);
			try {				
				const data = JSON.parse(e.data);
				// console.log('Iframe Data received:', data);

				if (data.task === 'allTables') {
					// Process the received data and update nodes or edges if needed
					try {
						setNodes(data.nodes);
						setEdges(data.edges);
					} catch (error) {
						console.error('Failed to parse or apply data:', error);
					}

				} 
				else if (data.task === 'specificTable') {
					console.log('Iframe Data received:', data.table_data);
					handleSpecificTable(data);
				}				

			} catch (error) {
				console.error('Failed to parse data:', e.data);
			}
		}
	
		// console.log('Setting up message listener');
		window.addEventListener('message', receiveMessage, false);
	
		return () => {
			// console.log('Cleaning up message listener');
			window.removeEventListener('message', receiveMessage);
		};
	}, []);

	return (
		<div style={{ height: '100%', width: '100%'}}>
			<div className="providerflow">
				<ReactFlowProvider>
					<div className="reactflow-wrapper">
					<LinkMarkers />
					<ReactFlow
						nodes={nodes}
						onNodesChange={handleNodesChange}
						edges={edges}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						fitView
						minZoom={0.2}
						edgeTypes={edgeTypes}
						nodeTypes={nodeTypes}
						proOptions={proOptions}
						connectionMode={ConnectionMode.Loose}
					>
						<Panel position="bottom-center">
							<button type="button" className="btn btn-success" onClick={onAdd}>add Table</button>
						</Panel>
						<Background />
						<Controls position = 'bottom-right' showInteractive={false}/>
						<MiniMap position='top-right' nodeStrokeWidth={3} />
					</ReactFlow>
					</div>
					<Sidebar nodes={nodes} setNodes={setNodes}/>
				</ReactFlowProvider>
			</div>
		</div>
	);
}

export default App;

