import { Calendar, ChevronDown, Home, Inbox, LucideProps, Search, Settings } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

type SidebarItem = {
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    children?: {
        title: string;
        url: string;
    }[];
};

const items: SidebarItem[] = [
    {
        title: 'Incontrol Panel',
        url: '#',
        icon: Home,
    },
    {
        title: 'Fee Library',
        url: '#',
        icon: Inbox,
    },
    {
        title: 'Analytics & Reports',
        url: '#',
        icon: Calendar,
        children: [
            {
                title: 'Pending',
                url: '#',
            },
        ],
    },
    {
        title: 'Saving Opportunities',
        url: '#',
        icon: Search,
        children: [
            {
                title: 'Data Integrity',
                url: '#',
            },
            {
                title: 'Visa Mar',
                url: '#',
            },
            {
                title: 'TPE',
                url: '#',
            },
            {
                title: 'Opt Outs',
                url: '#',
            },
        ],
    },
    {
        title: 'Fee Validation',
        url: '#',
        icon: Settings,
    },
    {
        title: 'Resources',
        url: '#',
        icon: Settings,
        children: [
            {
                title: 'Pending',
                url: '#',
            },
        ],
    },
];

export function MainSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                if (item.children && item.children.length > 0) {
                                    return (
                                        <Collapsible
                                            defaultOpen
                                            className="group/collapsible"
                                            key={item.title}
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton asChild>
                                                        <a href={item.url}>
                                                            <item.icon />
                                                            <span>{item.title}</span>
                                                            <ChevronDown
                                                                className={
                                                                    'ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180'
                                                                }
                                                            />
                                                        </a>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.children.map((childItem) => (
                                                            <SidebarMenuSubItem
                                                                key={childItem.title}
                                                            >
                                                                <SidebarMenuSubButton asChild>
                                                                    <a href={childItem.url}>
                                                                        <span>
                                                                            {childItem.title}
                                                                        </span>
                                                                    </a>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    );
                                } else {
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                }
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
