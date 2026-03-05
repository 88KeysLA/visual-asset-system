#!/bin/bash
# Monitor visual generation progress

echo "=== Visual Generation Monitor ==="
echo ""
echo "Generated videos:"
ls -1 /Users/mattser/visual-asset-system/output/production/*.mp4 2>/dev/null | wc -l | xargs echo "  Count:"
echo ""
echo "Latest log entries:"
tail -20 /tmp/visual-gen.log
echo ""
echo "To watch live: tail -f /tmp/visual-gen.log"
