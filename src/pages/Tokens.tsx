import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { JeffMascot } from "@/components/JeffMascot"
import { JeffLogo } from "@/components/JeffLogo"
import { Coins, Plus, LayoutDashboard, BookOpen, LineChart, GraduationCap, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Tokens() {
  const { user, tokens, addToken } = useApp()
  const navigate = useNavigate()
  const [showCreate, setShowCreate] = useState(false)
  const [formData, setFormData] = useState({ name: "", symbol: "", totalSupply: "" })

  const isPreview = window.location.hostname.includes('lovable') || window.location.hostname === 'localhost';
  if (!user && !isPreview) { navigate("/onboarding"); return null }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.symbol && formData.totalSupply) {
      addToken({ name: formData.name, symbol: formData.symbol.toUpperCase(), totalSupply: parseInt(formData.totalSupply) })
      setFormData({ name: "", symbol: "", totalSupply: "" })
      setShowCreate(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center gap-2">
              <JeffLogo size={32} />
              <span className="font-display font-bold text-xl">InvestiPlay</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <Link to="/dashboard"><Button variant="ghost" size="sm"><LayoutDashboard className="w-4 h-4 mr-2" />Dashboard</Button></Link>
              <Link to="/lessons"><Button variant="ghost" size="sm"><BookOpen className="w-4 h-4 mr-2" />Lessons</Button></Link>
              <Link to="/stocks"><Button variant="ghost" size="sm"><LineChart className="w-4 h-4 mr-2" />Stocks</Button></Link>
              <Link to="/tokens"><Button variant="default" size="sm"><Coins className="w-4 h-4 mr-2" />Tokens</Button></Link>
            </div>
            <Badge variant={user.literacyLevel as any} className="capitalize">{user.literacyLevel}</Badge>
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          <Link to="/dashboard" className="flex flex-col items-center gap-1"><div className="p-2 rounded-xl text-muted-foreground"><LayoutDashboard className="w-5 h-5" /></div><span className="text-xs text-muted-foreground">Home</span></Link>
          <Link to="/lessons" className="flex flex-col items-center gap-1"><div className="p-2 rounded-xl text-muted-foreground"><BookOpen className="w-5 h-5" /></div><span className="text-xs text-muted-foreground">Learn</span></Link>
          <Link to="/stocks" className="flex flex-col items-center gap-1"><div className="p-2 rounded-xl text-muted-foreground"><LineChart className="w-5 h-5" /></div><span className="text-xs text-muted-foreground">Stocks</span></Link>
          <Link to="/tokens" className="flex flex-col items-center gap-1"><div className="p-2 rounded-xl bg-primary text-primary-foreground"><Coins className="w-5 h-5" /></div><span className="text-xs font-medium">Tokens</span></Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Token Simulator</h1>
            <p className="text-muted-foreground">Create educational tokens to learn about tokenomics</p>
          </div>
          <JeffMascot size="sm" mood="excited" message="Create your own token!" />
        </div>

        <Button onClick={() => setShowCreate(!showCreate)} className="w-full mb-6" variant={showCreate ? "outline" : "hero"}>
          <Plus className="w-4 h-4 mr-2" /> {showCreate ? "Cancel" : "Create New Token"}
        </Button>

        {showCreate && (
          <Card variant="elevated" className="mb-6 animate-slide-up">
            <CardHeader><CardTitle>Create Token</CardTitle><CardDescription>This is for educational purposes only</CardDescription></CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <div><Label>Token Name</Label><Input placeholder="e.g., My Learning Token" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required /></div>
                <div><Label>Symbol</Label><Input placeholder="e.g., MLT" maxLength={5} value={formData.symbol} onChange={e => setFormData(p => ({ ...p, symbol: e.target.value }))} required /></div>
                <div><Label>Total Supply</Label><Input type="number" placeholder="e.g., 1000000" min="1" value={formData.totalSupply} onChange={e => setFormData(p => ({ ...p, totalSupply: e.target.value }))} required /></div>
                <Button type="submit" className="w-full"><Sparkles className="w-4 h-4 mr-2" /> Create Token</Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {tokens.length === 0 ? (
            <Card variant="elevated" className="text-center p-8">
              <Coins className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">No tokens created yet. Click above to create your first!</p>
            </Card>
          ) : (
            tokens.map(token => (
              <Card key={token.id} variant="elevated">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2"><span className="font-bold text-lg">{token.symbol}</span><Badge variant="accent">Simulated</Badge></div>
                      <p className="text-sm text-muted-foreground">{token.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${token.priceSimulation.toFixed(4)}</p>
                      <p className="text-xs text-muted-foreground">MC: ${(token.marketCap / 1000).toFixed(2)}K</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Supply:</span> <span className="font-medium">{token.totalSupply.toLocaleString()}</span></div>
                    <div><span className="text-muted-foreground">Created:</span> <span className="font-medium">{new Date(token.createdAt).toLocaleDateString()}</span></div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
