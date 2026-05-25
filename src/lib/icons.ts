import {
  ShoppingCart, Package, Factory, Boxes, IndianRupee, Users, Sparkles, Scissors, Building2,
  FileText, ClipboardCheck, Truck, Receipt, RefreshCw, Award, Calculator, Globe, Wallet, Shield,
  Layers, BarChart2, ListChecks, GitBranch, Workflow, Calendar, Clock, FileCheck, AlertCircle,
  TrendingUp, BookOpen, Database, ScanLine, Lock, Activity, Cog, Zap, Brain, Target,
  MessageSquare, ShieldCheck, Search, FilePlus, Mail, Bell, Eye, MapPin,
  Wrench, Briefcase, Folder, Settings, Smartphone, Building, Files, Server, KeyRound,
  CloudUpload, Gauge, BellRing, BookMarked, ScrollText, GitMerge, Bot, Megaphone,
  Fingerprint, AlertTriangle,
  Tag, Tags, Percent, Hash, FlaskConical, Microscope, History, ClipboardList, ClipboardCheck as ClipboardCheck2,
  Cpu, TrendingDown,
  CalendarDays, Timer, Lightbulb,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  ShoppingCart, Package, Factory, Boxes, IndianRupee, Users, Sparkles, Scissors, Building2,
  FileText, ClipboardCheck, Truck, Receipt, RefreshCw, Award, Calculator, Globe, Wallet, Shield,
  Layers, BarChart2, ListChecks, GitBranch, Workflow, Calendar, Clock, FileCheck, AlertCircle,
  TrendingUp, BookOpen, Database, ScanLine, Lock, Activity, Cog, Zap, Brain, Target,
  MessageSquare, ShieldCheck, Search, FilePlus, Mail, Bell, Eye, MapPin,
  Wrench, Briefcase, Folder, Settings, Smartphone, Building, Files, Server, KeyRound,
  CloudUpload, Gauge, BellRing, BookMarked, ScrollText, GitMerge, Bot, Megaphone,
  Fingerprint, AlertTriangle,
  Tag, Tags, Percent, Hash, FlaskConical, Microscope, History, ClipboardList,
  Cpu, TrendingDown,
  CalendarDays, Timer, Lightbulb,
};

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? ShoppingCart;
}
