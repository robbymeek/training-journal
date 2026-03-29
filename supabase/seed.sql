-- Run this in Supabase SQL Editor AFTER running schema.sql
-- This seeds your knowledge base with all your existing notes

-- ═══════════════ SAILING — SUPER LIGHT AIR ═══════════════
INSERT INTO knowledge_base (section, category, sub_topic, insight, wind, source_date) VALUES
('sailing', 'Super Light Air', 'upwind', 'Vang to feel, trim and ease out of tacks for speed boost. Use weight aggressively in tacks. Outhaul to what looks good — don''t make sail too baggy but trust instinct.', 'Super Light', '2026-03-29'),
('sailing', 'Super Light Air', 'upwind', 'Can ooch forward over waves to rebuild speed. Never sail tight/high-strung/too flat — let the boat flow. Eyes forward, trim and ease off feel and telltales.', 'Super Light', '2026-03-29'),
('sailing', 'Super Light Air', 'upwind', 'Can almost rock upwind in super light stuff — discovery from summer sailing.', 'Super Light', '2026-03-29'),
('sailing', 'Super Light Air', 'upwind', 'Relaxing upper body upwind works well — confirmed at North Americans.', 'Super Light', '2026-03-29'),
('sailing', 'Super Light Air', 'downwind', 'Reaching with gybes, then patient by the lee — boom out quite far, just feel it. Too much heel is bad.', 'Super Light', '2026-03-29'),

-- ═══════════════ SAILING — LIGHT AIR ═══════════════
('sailing', 'Light Air', 'upwind', 'Sometimes just past two-block felt okay. Don''t be afraid of a big mainsheet range if waves allow — keep the boat flowing and fast.', 'Light', '2026-03-29'),
('sailing', 'Light Air', 'upwind', 'Start to feel windward climbs of tiller and let boat flow upwind. Eyes focused upwind. Start moving back in boat if needed.', 'Light', '2026-03-29'),
('sailing', 'Light Air', 'upwind', 'Shoulders down a normal amount is good as long as they don''t come back up — ooch forwards almost.', 'Light', '2026-03-29'),
('sailing', 'Light Air', 'downwind', 'Start working the boat ASAP — windward heel and press before other boats = fast. But keep speed as priority, stay on one angle, don''t steer too much too soon.', 'Light', '2026-03-29'),
('sailing', 'Light Air', 'downwind', 'As breeze builds more, experiment with taking speed lower, moving back, pressing harder for waves. Can still row the boat downwind.', 'Light', '2026-03-29'),

-- ═══════════════ SAILING — MEDIUM BREEZE ═══════════════
('sailing', 'Medium Breeze', 'upwind', 'Watch out for too much Cunningham! Vang as necessary, outhaul to what looks good. Ease controls properly.', 'Medium', '2026-03-29'),
('sailing', 'Medium Breeze', 'upwind', 'Side swell = more depowered. Chop = more powered up with more bouncing to depower. Be aggressive in the boat when needed.', 'Medium', '2026-03-29'),
('sailing', 'Medium Breeze', 'upwind', 'Sometimes have to pin the sheet to keep height. Outhaul adjusts for wave skew. Weight placement is a huge control — focus on positioning because speed differences are honestly really small.', 'Medium', '2026-03-29'),
('sailing', 'Medium Breeze', 'upwind', 'Potentially: easing to power up and trimming to depower is the way to do it upwind.', 'Medium', '2026-03-29'),
('sailing', 'Medium Breeze', 'upwind', 'Vang is tricky — work both controls evenly but ratio changes tack to tack, usually less vang heavy. Into chop/swell: less cunno same vang then bounce for height. Cross swell: more cunno same vang to get fast.', 'Medium', '2026-03-29'),
('sailing', 'Medium Breeze', 'upwind', 'Quick leeward heel reloads — immediately press back down. When going upwind and feel flow, quick reload and squash. Really press on each chop even sitting on rail.', 'Medium', '2026-03-29'),
('sailing', 'Medium Breeze', 'upwind', 'Trim small trims to what you feel in helm. Shoulders up = throw in a little ease. Shoulders down = play sheet to maximize. Always trying to squeeze without killing speed.', 'Medium', '2026-03-29'),
('sailing', 'Medium Breeze', 'downwind', 'Experiment with moving weight back ASAP — just makes it faster. Lock in, knee forwards, press hard. Test knee down position.', 'Medium', '2026-03-29'),
('sailing', 'Medium Breeze', 'downwind', 'Reverse pump, make boat fast in small ways not dramatic ways. Sail as if flat water first, then factor in waves.', 'Medium', '2026-03-29'),
('sailing', 'Medium Breeze', 'downwind', 'Sometimes don''t trim in — just heel boat to windward and press. Don''t rush oversheeting. Be precise — if you know it won''t ease fast enough, don''t trim in. The gain is in the press back down.', 'Medium', '2026-03-29'),
('sailing', 'Medium Breeze', 'downwind', 'Work on throwing boat to by the lee — throw with less sheet ease then ease and re-press. Throw to by the lee with flatten, then ease, more flatten. Smooth yet aggressive.', 'Medium', '2026-03-29'),
('sailing', 'Medium Breeze', 'downwind', 'Downwind might need to work on upturning and really pressing flat before going into downturn. Experiment: is it best to make turns at top of swell?', 'Medium', '2026-03-29'),
('sailing', 'Medium Breeze', 'reaching', 'Need to work hard on reaches — throw body forwards.', 'Medium', '2026-03-29'),

-- ═══════════════ SAILING — HEAVY AIR ═══════════════
('sailing', 'Heavy Air', 'upwind', 'Crank vang and work the boat hard if too depowered. Steer with body to keep height. Watch out for too much Cunningham.', 'Heavy', '2026-03-29'),
('sailing', 'Heavy Air', 'upwind', 'Can''t depower so boat is easy — be fit and get through the upwind. Potentially play top of cone more aggressively.', 'Heavy', '2026-03-29'),
('sailing', 'Heavy Air', 'upwind', 'Speed gains from discovery of needing to be flat even in hard press/work hard conditions.', 'Heavy', '2026-03-29'),
('sailing', 'Heavy Air', 'upwind', 'Ooching and bouncing on each wave is definitely the move.', 'Heavy', '2026-03-29'),
('sailing', 'Heavy Air', 'downwind', 'Just rip — by the lee press more than you think, pushing with feet, ooching boat along.', 'Heavy', '2026-03-29'),
('sailing', 'Heavy Air', 'downwind', 'Work the low lane more when breeze comes up.', 'Heavy', '2026-03-29'),

-- ═══════════════ SAILING — SUPER HEAVY AIR ═══════════════
('sailing', 'Super Heavy Air', 'upwind', 'Unknown — need to develop experience and technique here.', 'Super Heavy', '2026-03-29'),

-- ═══════════════ BOATHANDLING ═══════════════
('boathandling', 'tacks', NULL, 'Need more confidence in tacks — OCR learning.', 'Medium', '2026-03-29'),
('boathandling', 'tacks', NULL, 'Use weight aggressively in tacks in super light air. Trim and ease out of tacks for a speed boost.', 'Super Light', '2026-03-29'),

-- ═══════════════ CONCEPTS ═══════════════
('concepts', 'mental', NULL, 'Have to attack the first race, the first start, and every moment of the regatta — otherwise don''t show up. Even if attacking without caring about results.', '', '2026-03-29'),
('concepts', 'mental', NULL, 'Everyone is just a sailor. Work on that mentality and start dusting people more.', '', '2026-03-29'),
('concepts', 'mental', NULL, 'No more ''shaking off'' — time to be precise and start nailing more than just the conditions you''re good in.', '', '2026-03-29'),
('concepts', 'mental', NULL, 'Last downwind: you have to want to kill the boats around you and want to be faster than them more than they want to be faster than you.', '', '2026-03-29'),
('concepts', 'mental', NULL, 'Patience on second upwinds — can''t make 40 boat-length gains in 2 tacks. Takes time, speed, patience in big fleets.', '', '2026-03-29'),
('concepts', 'mental', NULL, 'Downwinds need work mainly in mental game — relaxation and looking around more.', '', '2026-03-29'),
('concepts', 'fitness_info', NULL, 'Fitness is going to be important to work on — confirmed at Europeans.', '', '2026-03-29'),
('concepts', 'fitness_info', NULL, 'Oct 10 goal: 190 lbs. Nov 8-9: 182 lbs. Dec 10: 190 lbs minimum. Feb-March: 186 lbs.', '', '2026-03-29'),

-- ═══════════════ TACTICS ═══════════════
('tactics', 'starts', NULL, 'Strong start: hold and go fast, look over shoulder to see if you should tack. If everyone has or you can comfortably cross and it''s not left-wins, then cross.', '', '2026-03-29'),
('tactics', 'starts', NULL, 'Medium start: focus on speed, stick with where fleet tacks. If you NEED to be on other tack and can duck through, do it. If you get a lane on port at the boat and can tack back to starboard with a good lane, probably do that.', '', '2026-03-29'),
('tactics', 'starts', NULL, 'Weak start: now you have to make things happen and do what you want.', '', '2026-03-29'),
('tactics', 'starts', NULL, 'Upwind drift and turn down before lose too much flow. Trimmed in and scull to push boat to windward. Subtle windward drift.', '', '2026-03-29'),
('tactics', 'upwind_tactics', NULL, 'More chill — let things come to you. Focus on speed and playing the fleet, that''s how you get out in front.', '', '2026-03-29'),
('tactics', 'upwind_tactics', NULL, 'Don''t split from fleet for no reason, especially on second beat. Don''t tack away from established fast lane. Do what everyone else is doing but faster.', '', '2026-03-29'),
('tactics', 'upwind_tactics', NULL, 'Don''t randomly tack away and go slow. Can do your thing around the gate but then settle in and go fast.', '', '2026-03-29'),
('tactics', 'downwind_tactics', NULL, 'Go fast. If slow, send a gybe or calm down and rebuild speed. Find lanes, point at mark, get in the pressure. Sail lifted gybe when possible.', '', '2026-03-29'),
('tactics', 'downwind_tactics', NULL, 'Know if you want high or low lane as early as possible — sometimes pre-race.', '', '2026-03-29'),
('tactics', 'fleet_strategy', NULL, 'Go fast, focus on fleet shape. If ahead, don''t need to make anything happen.', '', '2026-03-29'),
('tactics', 'fleet_strategy', NULL, 'Don''t split from fleet for no reason. Look at everyone around you and do what they''re doing but faster.', '', '2026-03-29'),

-- ═══════════════ VENUES ═══════════════
('venues', 'Long Beach', NULL, 'Good starts and better in breeze. Working hard and working the boat is fastest. Play top of cone more aggressively.', 'Medium', '2026-03-29'),
('venues', 'Long Beach', NULL, 'Downwinds feel good. Much faster with body positioning and reverse pumping through waves. Hold one angle longer to rip — experiment with more frequent angle changes when breeze drops.', 'Medium', '2026-03-29'),
('venues', 'Long Beach', NULL, 'Need to work low lane more when breeze comes up.', 'Heavy', '2026-03-29'),
('venues', 'Miami', NULL, 'Quick leeward heel reloads immediately pressed back down. Ooching and bouncing on each wave is the move.', 'Medium', '2026-03-29'),
('venues', 'Miami', NULL, 'Trim small amounts to what you feel in helm. Shoulders up = ease, shoulders down = play sheet to maximize.', 'Medium', '2026-03-29'),
('venues', 'Miami', NULL, 'Downwind: sometimes don''t trim in, just heel to windward and press. Be precise — gain is in the press back down.', 'Medium', '2026-03-29'),
('venues', 'Vilamoura', NULL, 'Europeans venue — great in light wind, fast and smart. Need to develop heavy air technique here.', 'Light', '2026-03-29'),

-- ═══════════════ REGATTAS ═══════════════
('regattas', 'North Americans', NULL, 'Great in light winds. Fast downwind and upwind. Relaxing upper body upwind works.', 'Light', '2026-03-29'),
('regattas', 'North Americans', NULL, 'Wasn''t as fast in more breeze — figured out with a little depower then hiking hard and keeping boat flat.', 'Medium', '2026-03-29'),
('regattas', 'Long Beach OCR', NULL, 'Good starts, better in breeze. Working hard and working the boat is fastest. Can''t depower so boat is easy. Need more confidence in tacks.', 'Heavy', '2026-03-29'),
('regattas', 'Long Beach OCR', NULL, 'Downwinds feel good. Need to work low lane more when breeze comes up.', 'Medium', '2026-03-29'),
('regattas', 'Europeans', NULL, 'Great in light wind — fast and smart. Everyone is just a sailor, work on that mentality.', 'Light', '2026-03-29'),
('regattas', 'Europeans', NULL, 'Vang tricky — less vang heavy most of the time. Into chop/swell: less cunno same vang. Cross swell: more cunno same vang.', 'Medium', '2026-03-29'),
('regattas', 'Europeans', NULL, 'Downwinds tricky — throw boat to by the lee with less sheet ease, then ease and re-press. Smooth yet aggressive.', 'Medium', '2026-03-29'),
('regattas', 'Europeans', NULL, 'Reaching: need to work hard and throw body forwards.', 'Medium', '2026-03-29');
