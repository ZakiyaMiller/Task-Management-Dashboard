// Import avatar images
import profileImg from '../assets/avatars/profileImg.png';
import TeamMember1 from '../assets/avatars/TeamMember1.png';
import TeamMember2 from '../assets/avatars/TeamMember2.png';
import TeamMember3 from '../assets/avatars/TeamMember3.png';
import TeamMember4 from '../assets/avatars/TeamMember4.png';
import TeamMember5 from '../assets/avatars/TeamMember5.png';

// Task Status Constants
export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  DONE: 'done'
};

// Priority Levels
export const PRIORITY = {
  LOW: 'Low',
  HIGH: 'High',
  COMPLETED: 'Completed'
};

// Column Configuration
export const COLUMNS = [
  {
    id: 'todo',
    title: 'To Do',
    color: '#5030E5',
    count: 4
  },
  {
    id: 'inProgress',
    title: 'On Progress',
    color: '#FFA500',
    count: 3
  },
  {
    id: 'done',
    title: 'Done',
    color: '#8BC48A',
    count: 2
  }
];

// Profile Avatar
export const PROFILE_AVATAR = profileImg;

// Team Member Avatars for Tasks
export const AVATARS = [
  TeamMember1,
  TeamMember2,
  TeamMember3,
  TeamMember4,
  TeamMember5
];

// Available Tags
export const AVAILABLE_TAGS = [
  { name: 'Design', color: '#5030E5' },
  { name: 'Development', color: '#00C2FF' },
  { name: 'Research', color: '#FFA500' },
  { name: 'Testing', color: '#8BC48A' },
  { name: 'Documentation', color: '#9D5BD2' },
  { name: 'Bug', color: '#FF4D4D' },
  { name: 'Feature', color: '#4CAF50' },
  { name: 'Urgent', color: '#FF6B6B' }
];

// Effort Estimates
export const EFFORT_OPTIONS = [
  '30m',
  '1h',
  '2h',
  '3h',
  '4h',
  '1d',
  '2d',
  '3d',
  '5d',
  '1w',
  '2w'
];

// Initial Sample Tasks
export const INITIAL_TASKS = {
  todo: [
    {
      id: '1',
      title: 'Brainstorming',
      description: 'Brainstorming brings team members\' diverse experience into play.',
      priority: 'Low',
      assignees: [AVATARS[0], AVATARS[1], AVATARS[2]],
      comments: 12,
      files: 0,
      status: 'todo',
      dueDate: '2025-12-20',
      subtasks: [
        { id: 's1', text: 'Gather team ideas', completed: true },
        { id: 's2', text: 'Review market trends', completed: false },
        { id: 's3', text: 'Create mind map', completed: false }
      ],
      tags: ['Design', 'Research'],
      effort: '2h',
      activityLog: [
        { id: 'a1', type: 'subtask_completed', timestamp: '2025-12-18T10:30:00Z', message: 'Subtask completed: "Gather team ideas"' },
        { id: 'a2', type: 'subtask_added', timestamp: '2025-12-18T09:15:00Z', message: 'Subtask added: "Create mind map"' },
        { id: 'a3', type: 'created', timestamp: '2025-12-17T14:00:00Z', message: 'Task created' }
      ]
    },
    {
      id: '2',
      title: 'Research',
      description: 'User research helps you to create an optimal product for users.',
      priority: 'High',
      assignees: [AVATARS[2], AVATARS[3]],
      comments: 10,
      files: 3,
      status: 'todo',
      dueDate: '2025-12-19',
      subtasks: [
        { id: 's4', text: 'Conduct user interviews', completed: false },
        { id: 's5', text: 'Analyze competitor products', completed: true }
      ],
      tags: ['Research', 'Urgent'],
      effort: '1d',
      activityLog: [
        { id: 'a4', type: 'subtask_completed', timestamp: '2025-12-18T11:00:00Z', message: 'Subtask completed: "Analyze competitor products"' },
        { id: 'a5', type: 'priority', timestamp: '2025-12-18T08:30:00Z', message: 'Priority changed to High' },
        { id: 'a6', type: 'created', timestamp: '2025-12-17T15:20:00Z', message: 'Task created' }
      ]
    },
    {
      id: '3',
      title: 'Wireframes',
      description: 'Low fidelity wireframes include the most basic content and visuals.',
      priority: 'High',
      assignees: [AVATARS[0], AVATARS[4]],
      comments: 10,
      files: 5,
      status: 'todo',
      dueDate: '2025-12-25',
      subtasks: [],
      tags: ['Design'],
      effort: '4h',
      activityLog: [
        { id: 'a7', type: 'created', timestamp: '2025-12-18T08:00:00Z', message: 'Task created' }
      ]
    }
  ],
  inProgress: [
    {
      id: '4',
      title: 'Onboarding Illustrations',
      description: 'Create engaging illustrations for the onboarding flow.',
      priority: 'Low',
      assignees: [AVATARS[1], AVATARS[3]],
      comments: 14,
      files: 8,
      status: 'inProgress',
      dueDate: '2025-12-22',
      subtasks: [
        { id: 's6', text: 'Sketch initial concepts', completed: true },
        { id: 's7', text: 'Create digital versions', completed: true },
        { id: 's8', text: 'Review with team', completed: false }
      ],
      tags: ['Design', 'Feature'],
      effort: '3h',
      activityLog: [
        { id: 'a8', type: 'status_changed', timestamp: '2025-12-18T13:00:00Z', message: 'Status changed from todo to inProgress' },
        { id: 'a9', type: 'subtask_completed', timestamp: '2025-12-18T12:30:00Z', message: 'Subtask completed: "Create digital versions"' },
        { id: 'a10', type: 'created', timestamp: '2025-12-17T10:00:00Z', message: 'Task created' }
      ]
    },
    {
      id: '5',
      title: 'Moodboard',
      description: 'Create a visual moodboard to define the app\'s aesthetic direction.',
      priority: 'Low',
      assignees: [AVATARS[0], AVATARS[2], AVATARS[4]],
      comments: 9,
      files: 12,
      status: 'inProgress',
      dueDate: null,
      subtasks: [],
      tags: ['Design', 'Research'],
      effort: '1w',
      activityLog: [
        { id: 'a11', type: 'status_changed', timestamp: '2025-12-18T09:00:00Z', message: 'Status changed from todo to inProgress' },
        { id: 'a12', type: 'created', timestamp: '2025-12-17T11:30:00Z', message: 'Task created' }
      ]
    },
    {
      id: '6',
      title: 'Mobile App Design',
      description: 'Design the main screens for the mobile application.',
      priority: 'Low',
      assignees: [AVATARS[1], AVATARS[3], AVATARS[4]],
      comments: 18,
      files: 6,
      status: 'inProgress',
      dueDate: '2025-12-30',
      subtasks: [],
      tags: ['Design', 'Development'],
      effort: '2d',
      activityLog: [
        { id: 'a13', type: 'created', timestamp: '2025-12-18T07:00:00Z', message: 'Task created' }
      ]
    }
  ],
  done: [
    {
      id: '7',
      title: 'User Flow Diagram',
      description: 'Map out the complete user journey through the application.',
      priority: 'Low',
      assignees: [AVATARS[0], AVATARS[2]],
      comments: 8,
      files: 2,
      status: 'done',
      dueDate: '2025-12-15',
      subtasks: [
        { id: 's9', text: 'Identify key paths', completed: true },
        { id: 's10', text: 'Create diagram', completed: true }
      ],
      tags: ['Documentation', 'Research'],
      effort: '1h',
      activityLog: [
        { id: 'a14', type: 'status_changed', timestamp: '2025-12-17T16:00:00Z', message: 'Status changed from inProgress to done' },
        { id: 'a15', type: 'subtask_completed', timestamp: '2025-12-17T15:45:00Z', message: 'Subtask completed: "Create diagram"' },
        { id: 'a16', type: 'created', timestamp: '2025-12-16T09:00:00Z', message: 'Task created' }
      ]
    },
    {
      id: '8',
      title: 'Navigation Fix',
      description: 'Fix the navigation menu overlay issue on mobile devices.',
      priority: 'Low',
      assignees: [AVATARS[1], AVATARS[3]],
      comments: 5,
      files: 1,
      status: 'done',
      dueDate: null,
      subtasks: [],
      tags: ['Bug', 'Development'],
      effort: '30m',
      activityLog: [
        { id: 'a17', type: 'status_changed', timestamp: '2025-12-17T14:00:00Z', message: 'Status changed from inProgress to done' },
        { id: 'a18', type: 'created', timestamp: '2025-12-16T10:00:00Z', message: 'Task created' }
      ]
    },
    {
      id: '9',
      title: 'Design System',
      description: 'It just needs to adapt the UI from what you did before',
      priority: 'Completed',
      assignees: [AVATARS[0], AVATARS[2], AVATARS[4]],
      comments: 12,
      files: 15,
      status: 'done',
      subtasks: [
        { id: 's11', text: 'Create components', completed: true },
        { id: 's12', text: 'Document usage', completed: true },
        { id: 's13', text: 'Build examples', completed: true }
      ],
      tags: ['Design', 'Development', 'Documentation'],
      effort: '2w',
      activityLog: [
        { id: 'a19', type: 'status_changed', timestamp: '2025-12-16T17:00:00Z', message: 'Status changed from inProgress to done' },
        { id: 'a20', type: 'subtask_completed', timestamp: '2025-12-16T16:30:00Z', message: 'Subtask completed: "Build examples"' },
        { id: 'a21', type: 'priority', timestamp: '2025-12-16T14:00:00Z', message: 'Priority changed to Completed' },
        { id: 'a22', type: 'created', timestamp: '2025-12-15T09:00:00Z', message: 'Task created' }
      ]
    }
  ]
};
