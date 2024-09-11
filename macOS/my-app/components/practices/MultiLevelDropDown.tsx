import {
  faHome,
  faInfoCircle,
  faCogs,
  faUsers,
  faBriefcase,
  faDollarSign,
  faGraduationCap,
  faEnvelope,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import './multi.css';
import { MenuData } from '@/utils/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const menuItems: MenuData[] = [
  { id: 1, name: 'Home', icon: faHome },
  {
    id: 2,
    name: 'About Us',
    icon: faInfoCircle,
    children: [
      { id: 9, name: 'Mission' },
      { id: 10, name: 'Vision' },
      { id: 11, name: 'Team' },
    ],
  },
  {
    id: 3,
    name: 'Services',
    icon: faCogs,
    children: [
      { id: 12, name: 'Web Designing' },
      {
        id: 13,
        name: 'Marketing',

        children: [
          { id: 15, name: 'Mission' },
          { id: 16, name: 'SEO' },
          { id: 17, name: 'Social Media' },
          { id: 18, name: 'Email Marketing' },
        ],
      },
      {
        id: 19,
        name: 'Mobile App',

        children: [
          { id: 20, name: 'Android App' },
          { id: 21, name: 'iOS App' },
          { id: 22, name: 'Ionic App' },
          { id: 23, name: 'Flutter App' },
          { id: 24, name: 'Unity App' },
        ],
      },
    ],
  },
  { id: 4, name: 'Clients', icon: faUsers },
  { id: 5, name: 'Investors', icon: faBriefcase },
  { id: 6, name: 'Pricing', icon: faDollarSign },
  { id: 7, name: 'Training', icon: faGraduationCap },
  { id: 8, name: 'Contact', icon: faEnvelope },
];
function MultiLevelDropDown() {
  return (
    <div className='menu-bar m-0 p-0 bg-[rgb(0,100,0)] text-center'>
      <MultiLevelMenu items={menuItems} />
    </div>
  );
}

export default MultiLevelDropDown;

type multiLevelMenuProps = {
  items: MenuData[];
  depth?: number;
};

function MultiLevelMenu({ items, depth = 0 }: multiLevelMenuProps) {
  return (
    <>
      <ul className='inline-flex list-none text-white'>
        {items.map((item, index) => {
          return (
            <li
              key={item.id}
              className={`w-[120px]  bg-white m-4 p-1 ${
                item.children && depth > 0 && 'hover-me'
              }`}
            >
              <a
                href='#'
                className={`text-white no-underline ${
                  0 === index && 'hover:bg-red-300 border-r-4'
                }`}
              >
                {item.icon && (
                  <FontAwesomeIcon icon={item.icon} className='mr-2' />
                )}

                {item.name}
              </a>
              {item.children && depth > 0 && (
                <FontAwesomeIcon icon={faAngleRight} className='float-right' />
              )}

              {item.children && (
                <div
                  className={`submenu ${
                    depth === 0 ? 'submenu-primary' : 'submenu-nested'
                  } hidden`}
                >
                  <MultiLevelMenu items={item.children} depth={depth + 1} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
