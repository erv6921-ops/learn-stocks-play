import { useSyncExternalStore } from "react";
import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCheck, TrendingUp, TrendingDown, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  subscribe,
  getSnapshot,
  markAllRead,
  clearNotifications,
} from "@/lib/notifications";

export default function NotificationBell() {
  const notifications = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <Popover onOpenChange={(open) => { if (open) markAllRead(); }}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground w-8 h-8"
          aria-label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
        >
          <Bell className="w-4 h-4" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold leading-none">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-bold">InvestiCoin Activity</h3>
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
            <CheckCheck className="w-6 h-6" />
            <p className="text-xs">No coin activity yet!</p>
          </div>
        ) : (
          <ScrollArea className="h-80">
            <ul className="divide-y divide-border">
              {notifications.map((n) => {
                if (n.type === "grade") {
                  return (
                    <li key={n.id} className="flex gap-3 px-4 py-3">
                      <Award className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug break-words">{n.title}</p>
                        {n.body && (
                          <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap break-words leading-snug">
                            {n.body}
                          </p>
                        )}
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {formatDistanceToNow(n.date, { addSuffix: true })}
                        </p>
                      </div>
                    </li>
                  );
                }
                const gain = n.type === "gain";
                const Icon = gain ? TrendingUp : TrendingDown;
                return (
                  <li key={n.id} className="flex gap-3 px-4 py-3">
                    <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${gain ? "text-gold" : "text-destructive"}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-snug break-words">{n.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {formatDistanceToNow(n.date, { addSuffix: true })}
                      </p>
                    </div>
                    <span className={`text-sm font-bold tabular-nums shrink-0 ${gain ? "text-gold" : "text-destructive"}`}>
                      {gain ? "+" : "-"}
                      {Math.abs(n.amount ?? 0).toLocaleString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}
